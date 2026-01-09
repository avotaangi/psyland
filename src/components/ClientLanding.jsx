import React from "react";

const PALETTE = {
  text: "rgba(19, 39, 63, 0.95)",
  muted: "rgba(19, 39, 63, 0.7)",
};

export default function ClientLanding() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#FFFFFF" }}>
      {/* iPhone frame */}
      <div
        className="rounded-[3rem] border overflow-hidden relative"
        style={{
          borderColor: "#000000",
          borderWidth: "4px",
          background: "#000000",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1) inset",
          maxWidth: "430px",
          width: "100%",
          minHeight: "900px",
        }}
      >
        {/* iPhone 15 Pro Max Dynamic Island */}
        <div 
          className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10"
          style={{
            width: "126px",
            height: "37px",
            background: "#000000",
            borderRadius: "19px",
          }}
        />
        
        <div className="p-2 md:p-3" style={{ paddingTop: "2.5rem", background: "#FFFFFF", minHeight: "100%" }}>
          {/* Встроенные кнопки Telegram */}
          <div className="mt-4 mb-4 flex items-center justify-between">
            <button
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200"
              style={{
                borderRadius: "1.5rem",
                background: "rgba(0, 0, 0, 0.06)",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Close
            </button>
            <button
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-200"
              style={{
                borderRadius: "1.5rem",
                background: "rgba(0, 0, 0, 0.06)",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>

          {/* Main content */}
          <div className="rounded-3xl border p-5 md:p-6 space-y-4"
               style={{
                 borderColor: "rgba(58, 65, 50, 0.3)",
                 background: "rgba(58, 65, 50, 0.08)",
               }}>
            {/* Верхняя часть - Приветствие */}
            <div className="rounded-3xl border p-5 md:p-6"
                 style={{
                   borderColor: "rgba(255, 255, 255, 0.2)",
                   background: "rgba(255, 255, 255, 0.3)",
                 }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs mb-3" style={{ color: PALETTE.text }}>
                    ДОБРО ПОЖАЛОВАТЬ! 👋
                  </div>
                  <div className="text-lg md:text-xl font-semibold mb-1" style={{ color: PALETTE.text }}>
                    Здравствуйте,
                  </div>
                  <div className="text-base md:text-lg font-semibold mb-3" style={{ color: PALETTE.text }}>
                    Фамилия Имя
                  </div>
                  <div className="text-xs md:text-sm leading-relaxed" style={{ color: PALETTE.muted }}>
                    Выберите услугу или эксперта для записи
                  </div>
                </div>
                <div
                  className="h-16 w-16 md:h-20 md:w-20 rounded-full border shrink-0"
                  aria-label="Фото профиля"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                />
              </div>
            </div>

            {/* Средняя часть - Карточки выбора */}
            <div className="rounded-3xl border p-5 md:p-6"
                 style={{
                   borderColor: "rgba(58, 65, 50, 0.3)",
                   background: "rgba(58, 65, 50, 0.08)",
                 }}>
              <div className="text-base md:text-lg font-semibold mb-2" style={{ color: PALETTE.text }}>
                С чего начнём?
              </div>
              <div className="text-xs md:text-sm mb-4" style={{ color: PALETTE.muted }}>
                Выберите удобный для вас способ
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="rounded-3xl border p-3 md:p-4 relative overflow-hidden transition-all duration-200 hover:opacity-90 h-full"
                  style={{
                    borderColor: "rgba(251, 146, 60, 0.3)",
                    background: "rgba(251, 146, 60, 0.2)",
                  }}
                >
                  <div className="flex flex-col items-start justify-between h-full min-h-[100px]">
                    <div className="flex items-center justify-between w-full mb-auto">
                      <div className="text-xs md:text-sm font-semibold text-left" style={{ color: PALETTE.text }}>
                        Выбрать услугу
                      </div>
                      <div
                        className="h-6 w-6 rounded-full border flex items-center justify-center shrink-0"
                        style={{
                          borderColor: "rgba(255, 140, 0, 0.4)",
                          background: "rgba(255, 140, 0, 0.8)",
                        }}
                      >
                        <span className="text-sm" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  className="rounded-3xl border p-3 md:p-4 relative overflow-hidden transition-all duration-200 hover:opacity-90 h-full"
                  style={{
                    borderColor: "rgba(251, 146, 60, 0.3)",
                    background: "rgba(251, 146, 60, 0.2)",
                  }}
                >
                  <div className="flex flex-col items-start justify-between h-full min-h-[100px]">
                    <div className="flex items-center justify-between w-full mb-auto">
                      <div className="text-xs md:text-sm font-semibold text-left" style={{ color: PALETTE.text }}>
                        Выбрать эксперта
                      </div>
                      <div
                        className="h-6 w-6 rounded-full border flex items-center justify-center shrink-0"
                        style={{
                          borderColor: "rgba(255, 140, 0, 0.4)",
                          background: "rgba(255, 140, 0, 0.8)",
                        }}
                      >
                        <span className="text-sm" style={{ color: "rgb(255, 255, 255)" }}>→</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Нижняя часть - Запланированные встречи */}
            <div className="rounded-3xl border p-5 md:p-6"
                 style={{
                   borderColor: "rgba(58, 65, 50, 0.3)",
                   background: "rgba(58, 65, 50, 0.08)",
                 }}>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="h-10 w-10 rounded-2xl border flex items-center justify-center"
                  style={{
                    borderColor: "rgba(147, 51, 234, 0.2)",
                    background: "rgba(147, 51, 234, 0.1)",
                  }}
                >
                  <span className="text-sm font-semibold" style={{ color: PALETTE.text }}>17</span>
                </div>
                <div>
                  <div className="text-base md:text-lg font-semibold" style={{ color: PALETTE.text }}>
                    Запланированные встречи
                  </div>
                  <div className="text-xs md:text-sm" style={{ color: PALETTE.muted }}>
                    Ваши предстоящие встречи
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <div
                  className="h-20 w-20 rounded-2xl border flex items-center justify-center mb-4"
                  style={{
                    borderColor: "rgba(147, 51, 234, 0.2)",
                    background: "rgba(147, 51, 234, 0.1)",
                  }}
                >
                  <span className="text-2xl">📚</span>
                </div>
                <div className="text-sm font-medium mb-2" style={{ color: PALETTE.text }}>
                  У вас пока нет запланированных встреч.
                </div>
                <div className="text-xs text-center leading-relaxed" style={{ color: PALETTE.muted }}>
                  Выберите услугу или эксперта для отображения услуги
                </div>
              </div>
            </div>

            {/* Секция - Прошедшие встречи */}
            <div className="rounded-3xl border p-5 md:p-6"
                 style={{
                   borderColor: "rgba(58, 65, 50, 0.3)",
                   background: "rgba(58, 65, 50, 0.08)",
                 }}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-10 w-10 rounded-2xl border flex items-center justify-center"
                  style={{
                    borderColor: "rgba(147, 51, 234, 0.2)",
                    background: "rgba(147, 51, 234, 0.1)",
                  }}
                >
                  <span className="text-sm font-semibold" style={{ color: "rgb(255, 255, 255)" }}>✓</span>
                </div>
                <div>
                  <div className="text-base md:text-lg font-semibold" style={{ color: PALETTE.text }}>
                    Прошедшие встречи
                  </div>
                  <div className="text-xs md:text-sm" style={{ color: PALETTE.muted }}>
                    История ваших встреч
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {/* Карточка встречи 1 */}
                <div className="rounded-2xl border p-4"
                     style={{
                       borderColor: "rgba(255, 255, 255, 0.2)",
                       background: "rgba(255, 255, 255, 0.95)",
                     }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-semibold mb-1" style={{ color: "rgb(0, 0, 0)" }}>
                        5 октября в 11:30
                      </div>
                      <div className="text-xs mb-2" style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                        Консультация • Знакомство
                      </div>
                      <div className="inline-block px-3 py-1 rounded-lg text-xs"
                           style={{
                             background: "rgba(128, 128, 128, 0.1)",
                             color: "rgba(0, 0, 0, 0.8)",
                           }}>
                        Эксперт - Алина Игнатова
                      </div>
                    </div>
                    <div
                      className="h-12 w-12 rounded-full border shrink-0"
                      aria-label="Фото эксперта"
                      style={{
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        background: "rgba(139, 115, 85, 0.15)",
                      }}
                    />
                  </div>
                </div>

                {/* Карточка встречи 2 */}
                <div className="rounded-2xl border p-4"
                     style={{
                       borderColor: "rgba(255, 255, 255, 0.2)",
                       background: "rgba(255, 255, 255, 0.95)",
                     }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-sm font-semibold mb-1" style={{ color: "rgb(0, 0, 0)" }}>
                        4 октября в 21:00
                      </div>
                      <div className="text-xs mb-2" style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                        Консультация • Знакомство
                      </div>
                      <div className="inline-block px-3 py-1 rounded-lg text-xs"
                           style={{
                             background: "rgba(128, 128, 128, 0.1)",
                             color: "rgba(0, 0, 0, 0.8)",
                           }}>
                        Эксперт - Алина Игнатова
                      </div>
                    </div>
                    <div
                      className="h-12 w-12 rounded-full border shrink-0"
                      aria-label="Фото эксперта"
                      style={{
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        background: "rgba(139, 115, 85, 0.15)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

