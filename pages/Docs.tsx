
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book, ChevronRight, Menu, X, Hash, List, Code } from 'lucide-react';
import { DocArticle } from '../types';

export const Docs: React.FC = () => {
  const { t } = useApp();
  const [activeArticleId, setActiveArticleId] = useState<string>('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to find current article data
  let currentArticle: DocArticle | undefined;
  t.docs.sections.forEach(sec => {
      const found = sec.articles.find(a => a.id === activeArticleId);
      if (found) currentArticle = found;
  });

  // Custom "Markdown-lite" renderer
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Header 3 (### Title)
      if (line.trim().startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-bold text-slate-800 dark:text-white mt-8 mb-4 flex items-center gap-2">
            <Hash size={18} className="text-primary-500 opacity-50" />
            {line.replace('### ', '')}
          </h3>
        );
      }
      
      // List Item (- Item)
      if (line.trim().startsWith('- ')) {
        const text = line.replace('- ', '');
        return (
          <li key={index} className="flex items-start gap-3 mb-3 ml-2 text-slate-600 dark:text-slate-300">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0"></span>
            <span className="leading-relaxed">{parseInline(text)}</span>
          </li>
        );
      }

      // Empty line (Spacing)
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }

      // Standard Paragraph
      return (
        <p key={index} className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-2">
          {parseInline(line)}
        </p>
      );
    });
  };

  // Helper to parse inline styles like **bold** and `code`
  const parseInline = (text: string) => {
    // Split by code blocks first
    const parts = text.split(/(`[^`]+`)/g);
    
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        // Render Code Snippet
        return (
          <code key={i} className="bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200 dark:border-slate-700">
            {part.slice(1, -1)}
          </code>
        );
      }
      
      // Parse Bold inside normal text
      return (
        <span key={i}>
          {part.split(/(\*\*[^*]+\*\*)/g).map((subPart, j) => {
             if (subPart.startsWith('**') && subPart.endsWith('**')) {
                 return <strong key={j} className="font-bold text-slate-900 dark:text-white">{subPart.slice(2, -2)}</strong>;
             }
             return subPart;
          })}
        </span>
      );
    });
  };

  const Sidebar = () => (
      <nav className="space-y-8">
          {t.docs.sections.map((section, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                  <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-3">
                      {section.title}
                  </h3>
                  <div className="space-y-1">
                      {section.articles.map((article) => (
                          <button
                              key={article.id}
                              onClick={() => {
                                  setActiveArticleId(article.id);
                                  setIsMobileMenuOpen(false);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                                  activeArticleId === article.id
                                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm'
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:pl-4'
                              }`}
                          >
                              {article.title}
                              {activeArticleId === article.id && <ChevronRight size={14} />}
                          </button>
                      ))}
                  </div>
              </div>
          ))}
      </nav>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-4 sticky top-24 z-30">
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full shadow-lg shadow-slate-200/20 dark:shadow-black/20"
                >
                    <div className="flex items-center gap-3">
                        {isMobileMenuOpen ? <X size={20} className="text-primary-500" /> : <Menu size={20} className="text-primary-500" />}
                        <span className="font-bold text-slate-700 dark:text-slate-200">{t.nav.docs} Menu</span>
                    </div>
                    <ChevronRight size={20} className={`text-slate-400 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {isMobileMenuOpen && (
                    <div className="mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl animate-scale-in relative z-40">
                        <Sidebar />
                    </div>
                )}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 scrollbar-thin">
                    <div className="flex items-center gap-3 mb-8 px-2 text-slate-900 dark:text-white">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                             <Book size={20} strokeWidth={2.5} />
                        </div>
                        <span className="font-bold text-xl tracking-tight">{t.nav.docs}</span>
                    </div>
                    <Sidebar />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow min-w-0">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{t.docs.title}</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-light">{t.docs.subtitle}</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-16 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 min-h-[600px]">
                    {currentArticle ? (
                        <article className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                                {currentArticle.title}
                            </h2>
                            <div className="prose-custom">
                                {renderContent(currentArticle.content)}
                            </div>
                        </article>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <Book size={64} className="mb-4 opacity-20" />
                            <p>Select an article from the menu</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};
