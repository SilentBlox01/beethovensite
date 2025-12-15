
// Minimal client-side EXIF parser
// Supports JPEG APP1 (Exif) reading for Date, Camera, GPS

export interface ExifData {
    make?: string;
    model?: string;
    date?: string;
    gps?: {
        lat: number;
        lng: number;
    };
    software?: string;
}

export const readExif = async (file: File): Promise<ExifData | null> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const buffer = e.target?.result as ArrayBuffer;
                const view = new DataView(buffer);

                if (view.getUint16(0, false) !== 0xFFD8) return resolve(null); // Not JPEG

                const length = view.byteLength;
                let offset = 2;

                while (offset < length) {
                    if (view.getUint16(offset + 2, false) <= 8) return resolve(null);

                    const marker = view.getUint16(offset, false);
                    offset += 2;

                    if (marker === 0xFFE1) {
                        if (view.getUint32(offset + 4, false) !== 0x45786966) { // "Exif"
                            return resolve(null);
                        }

                        const littleEndian = view.getUint16(offset + 10, false) === 0x4949;
                        const count = view.getUint16(offset + 18, littleEndian);
                        const tags: any = {};

                        let tOffset = offset + 20;
                        for (let i = 0; i < count; i++) {
                            const tag = view.getUint16(tOffset, littleEndian);
                            tags[tag] = readTagValue(view, tOffset, offset + 10, littleEndian);
                            tOffset += 12;
                        }

                        // GPS IFD
                        let gpsData = null;
                        const gpsOffsetPtr = tags[0x8825]; // GPSInfo IFD Pointer
                        if (gpsOffsetPtr) {
                            const gpsOffset = offset + 10 + gpsOffsetPtr;
                            const gpsCount = view.getUint16(gpsOffset, littleEndian);
                            const gpsTags: any = {};
                            let gOffset = gpsOffset + 2;
                            for (let i = 0; i < gpsCount; i++) {
                                const tag = view.getUint16(gOffset, littleEndian);
                                gpsTags[tag] = readTagValue(view, gOffset, offset + 10, littleEndian);
                                gOffset += 12;
                            }

                            if (gpsTags[2] && gpsTags[4]) { // Lat and Lng
                                const lat = convertDMSToDD(gpsTags[2], gpsTags[1]);
                                const lng = convertDMSToDD(gpsTags[4], gpsTags[3]);
                                gpsData = { lat, lng };
                            }
                        }

                        resolve({
                            make: tags[0x010F],
                            model: tags[0x0110],
                            date: tags[0x9003] || tags[0x0132],
                            software: tags[0x0131],
                            gps: gpsData || undefined
                        });
                        return;
                    } else {
                        offset += view.getUint16(offset, false);
                    }
                }
                resolve(null);
            } catch (e) {
                console.error(e);
                resolve(null);
            }
        };
        reader.readAsArrayBuffer(file.slice(0, 128 * 1024)); // Read first 128KB
    });
};

function readTagValue(view: DataView, tOffset: number, tiffStart: number, littleEndian: boolean) {
    const type = view.getUint16(tOffset + 2, littleEndian);
    const numValues = view.getUint32(tOffset + 4, littleEndian);
    const valueOffset = view.getUint32(tOffset + 8, littleEndian) + tiffStart;

    switch (type) {
        case 2: // ASCII
            const offset = numValues > 4 ? valueOffset : (tOffset + 8);
            let str = '';
            for (let i = 0; i < numValues - 1; i++) {
                str += String.fromCharCode(view.getUint8(offset + i));
            }
            return str;
        case 3: // SHORT
            return view.getUint16(tOffset + 8, littleEndian);
        case 4: // LONG
            return view.getUint32(tOffset + 8, littleEndian);
        case 5: // RATIONAL
            const numerator = view.getUint32(valueOffset, littleEndian);
            const denominator = view.getUint32(valueOffset + 4, littleEndian);
            return numerator / denominator;
        default:
            return null;
    }
}

function convertDMSToDD(coords: number[], ref: string) {
    if (!coords || coords.length < 3) return 0;
    let dd = coords[0] + coords[1] / 60 + coords[2] / 3600;
    if (ref === "S" || ref === "W") dd = dd * -1;
    return dd;
}
