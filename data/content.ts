
import { Recommendation, UserProfile, Translation } from '../types';

// Generates recommendations using localized strings from 't'
export const generateRecommendations = (profile: UserProfile, t: Translation): Recommendation[] => {
  const recs: Recommendation[] = [];

  // --- PHASE 1: BASIC SECURITY & OS ---
  if (profile.platforms.includes('android')) {
    recs.push({
      id: 'rec-android',
      category: 'Móvil',
      title: t.recs.android.title,
      description: t.recs.android.desc,
      impact: 'Alto',
      actionUrl: '/tools' // Changed from /guides to /tools since guides are removed
    });
  }
  
  // Updates
  if (profile.updateHabit === 'manual-late' || profile.updateHabit === 'never') {
    recs.push({
      id: 'rec-updates',
      category: 'Hábitos',
      title: t.recs.updates.title,
      description: t.assessment.questions.updates,
      impact: 'Crítico'
    });
  }

  // Passwords (CRITICAL)
  if (profile.passwordHabit === 'reused') {
    recs.push({
      id: 'rec-pass-reuse',
      category: t.tools.tabKeys,
      title: t.recs.passwords.title,
      description: t.assessment.questions.passwordsDesc,
      impact: 'Crítico',
      actionUrl: '/tools'
    });
  }

  // Default fallback if no specific logic hit
  if (recs.length === 0 && profile.score < 50) {
      recs.push({
          id: 'generic',
          category: 'General',
          title: t.recs.generic.title,
          description: t.recs.generic.desc,
          impact: 'Medio'
      })
  }

  return recs;
};
