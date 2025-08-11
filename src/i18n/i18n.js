import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      // Navigation
      home: "Bosh sahifa",
      templates: "Shablonlar",
      mistakes: "Xatolar",
      profile: "Profil",
      testFailed: "Test muvaffaqiyatsiz tugadi",
      tooManyMistakes: "Siz 3 tadan ortiq xato qildingiz. Test to'xtatildi.",
      finalResult: "Yakuniy natija",
      correctAnswers: "To'g'ri javoblar",
      wrongAnswers: "Noto'g'ri javoblar",
      totalAnswered: "Jami javoblar",
      backToTemplates: "Shablonlarga qaytish",
      questionsNavigation: "Savollar navigatsiyasi",
      selectAnswer: "Javobni tanlang",
      current: "Joriy",
      unanswered: "Javobsiz",

      // Mistakes sahifasi uchun
      noMistakesYet: "Hozircha hech qanday xato yo'q",
      keepItUp: "Davom eting!",
      analyzeMistakes:
        "O'z xatolaringizni tahlil qiling va bilimlaringizni oshiring",

      // Loading optimizatsiyasi uchun
      loadingTemplates: "Shablonlar yuklanmoqda...",
      templatesLoaded: "Shablonlar yuklandi",

      // Profile sahifasi yangi achievements
      testEnthusiast: "Test ishqibozi",
      testEnthusiastDesc: "10 ta test ishlab chiqing",
      teacher: "O'qituvchi",
      teacherDesc: "80% muvaffaqiyat darajasiga erishing",
      knowledgeable: "Bilimdon",
      knowledgeableDesc: "50 ta to'g'ri javob bering",
      marathonRunner: "Marafon yuguruvchisi",
      marathonRunnerDesc: "100 ta test bajaring",

      // Umumiy
      excellent: "Ajoyib!",
      noMistakes: "Sizda hech qanday xato yo'q!",
      continueText: "Davom eting va ko'proq test bajaring!",
      explanation: "Tushuntirish",
      piece: "ta",
      // Home Page
      welcome: " AvtoTest     Test Tizimiga Xush Kelibsiz",
      homeDescription: "Professional test yechish platformasi",
      startTesting: "Testni Boshlash",
      viewTemplates: "Shablonlarni Ko'rish",
      checkMistakes: "Xatolarni Ko'rish",
      viewProfile: "Profilni Ko'rish",

      // Templates Page
      templatesTitle: "Test Shablonlari",
      questionsCount: "ta savol",
      startTest: "Testni Boshlang",

      // Test Page
      question: "Savol",
      of: "dan",
      nextQuestion: "Keyingi Savol",
      finishTest: "Testni Yakunlash",
      correct: "To'g'ri!",
      incorrect: "Noto'g'ri!",
      correctAnswer: "To'g'ri javob:",

      // Mistakes Page
      mistakesTitle: "Sizning Xatolaringiz",
      noMistakes: "Siz hali hech qanday xato qilmagansiz!",
      templateName: "Shablon nomi",
      yourAnswer: "Sizning javobingiz",
      rightAnswer: "To'g'ri javob",
      date: "Sana",

      // Profile Page
      profileTitle: "Profil Ma'lumotlari",
      firstName: "Ism",
      lastName: "Familiya",
      phone: "Telefon",
      statistics: "Statistika",
      totalTests: "Jami testlar",
      correctAnswers: "To'g'ri javoblar",
      wrongAnswers: "Noto'g'ri javoblar",
      successRate: "Muvaffaqiyat foizi",

      // Auth
      login: "Kirish",
      register: "Ro'yxatdan o'tish",
      password: "Parol",
      confirmPassword: "Parolni tasdiqlash",
      logout: "Chiqish",

      // Common
      loading: "Yuklanmoqda...",
      error: "Xatolik yuz berdi",
      tryAgain: "Qayta urinish",
      back: "Orqaga",
      submit: "Yuborish",

      // Additional texts for Home page
      testDescription: "Test shablonlarini ko'rish va test yechishni boshlash",
      mistakesDescription: "Qilgan xatolaringizni ko'rish va tahlil qilish",
      profileDescription: "Shaxsiy ma'lumotlar va statistikalarni ko'rish",
      personalInfo: "Shaxsiy ma'lumotlar va test natijalari statistikasi",
      featuredTitle1: "Maqsadli Ta'lim",
      featuredDesc1:
        "Har bir test sizning bilim darajangizni oshirish uchun mo'ljallangan",
      featuredTitle2: "Taraqqiyot Kuzatuvi",
      featuredDesc2:
        "Statistikalar orqali o'z rivojlanishingizni kuzatib boring",
      featuredTitle3: "Keng Qamrovli",
      featuredDesc3: "Turli mavzular bo'yicha minglab savollar bazasi",
      viewMore: "Ko'proq",
      testQuestions: "Test savollari",
      languageVariants: "Til variantlari",
      availability: "Dostuplik",

      // Templates page
      chooseTemplate:
        "O'zingizga mos test shablonini tanlang va bilimlaringizni sinab ko'ring",
      noTemplatesFound: "Shablonlar topilmadi",
      noTemplatesDesc: "Tanlangan tilda test shablonlari mavjud emas",
      template: "Shablon",
      piece: "ta",
      questionCount2: "Savol soni:",
      language: "Til:",
      testInfo: "Test haqida ma'lumot",
      testInfoDesc:
        "Har bir test shabloni turli mavzular bo'yicha savollarni o'z ichiga oladi. Test jarayonida har bir savolga javob berishingiz kerak. Noto'g'ri javob berganda, to'g'ri javob ko'rsatiladi va bu sizning xatolar bo'limiga saqlanadi.",
      easyStart: "Oson Boshlash",
      easyStartDesc: "Shablonni tanlang va darhol test yechishni boshlang",
      variousTopics: "Turli Mavzular",
      variousTopicsDesc:
        "Har xil sohalar bo'yicha keng qamrovli test savollari",
      multiLanguage: "Ko'p Tillar",
      multiLanguageDesc:
        "O'zbek, rus va boshqa tillarda test topshirish imkoniyati",

      // Test page
      questionLabel: "Savol:",
      confirmAnswer: "Javobni Tasdiqlash",

      // Mistakes page
      analyzeMistakes:
        "Qilgan xatolaringizni tahlil qiling va bilimlaringizni mustahkamlang",
      excellent: "Ajoyib! Hech qanday xato yo'q",
      continueText:
        "Testlarni yechishda davom eting va o'z bilimlaringizni yanada oshiring!",
      totalMistakes: "Jami xatolar",
      differentTemplates: "Turli shablonlar",
      explanation: "Tushuntirish",
      learningTips: "O'rganish bo'yicha maslahatlar",
      repeat: "Takrorlang",
      repeatDesc: "Xato qilgan mavzularni qayta o'rganing va takrorlang",
      deepLearning: "Chuqur o'rganing",
      deepLearningDesc:
        "Noto'g'ri javob bergan mavzular bo'yicha qo'shimcha ma'lumot oling",
      practice: "Amaliyot qiling",
      practiceDesc: "O'xshash testlarni ko'proq yechib ko'ring",

      // Profile page
      specialist: "Mutaxassis",
      skilled: "Malakali",
      good: "Yaxshi",
      average: "O'rtacha",
      beginner: "Yangi boshlovchi",
      registeredDate: "Ro'yxatdan o'tgan",
      unknownDate: "Ma'lum emas",
      overallSuccess: "Umumiy muvaffaqiyat",
      correctPercentage: "To'g'ri javoblar",
      wrongPercentage: "Noto'g'ri javoblar",
      achievements: "Yutuqlar",
      testEnthusiast: "Test Ishqibozi",
      testEnthusiastDesc: "10 ta test yeching",
      teacher: "Ustoz",
      teacherDesc: "80% muvaffaqiyat",
      knowledgeable: "Bilimdon",
      knowledgeableDesc: "50 ta to'g'ri javob",
      marathonRunner: "Maraton O'tkazuvchi",
      marathonRunnerDesc: "100 ta test yeching",

      // Auth pages
      welcomeToIntalim: " AvtoTest    ga kirish",
      welcomeDesc: "Test tizimiga xush kelibsiz",
      enterPhone: "90 123 45 67",
      enterName: "Ismingizni kiriting",
      enterLastname: "Familiyangizni kiriting",
      enterPassword: "Parolingizni kiriting",
      repeatPassword: "Parolni takrorlang",
      minChars: "Kamida 6 ta belgi",
      accountExists: "Hisobingiz bormi?",
      noAccount: "Hisobingiz yo'qmi?",
      signUp: "Ro'yxatdan o'ting",
      signIn: "Kirish",
      createAccount: "Ro'yxatdan o'tish",
      createAccountDesc: "Yangi hisob yarating va testlarni boshlang",
      quickStart: "Tez Boshlash",
      secure: "Xavfsiz",
      progress: "Taraqqiyot",
      questions: "Savollar",
      languages: "Tillar",

      // Validation messages
      phoneValidation: "Telefon raqami 9 ta raqamdan iborat bo'lishi kerak",
      passwordValidation: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      nameValidation: "Ism va familiyani kiriting",
      passwordMismatch: "Parollar mos kelmaydi",
      loginSuccess: "Muvaffaqiyatli kirdingiz!",
      registerSuccess: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
      testFinished: "Test muvaffaqiyatli yakunlandi!",
      selectAnswer: "Iltimos javobni tanlang",
      // Admin panel translations
      adminPanel: "Admin Panel",
      systemManagement: "Tizim boshqaruvi",
      dashboard: "Boshqaruv paneli",
      students: "Talabalar",
      payments: "To'lovlar",
      analytics: "Tahlil",
      totalUsers: "Jami foydalanuvchilar",
      proUsers: "PRO foydalanuvchilar",
      todayRevenue: "Bugungi daromad",
      monthlyRevenue: "Oylik daromad",
      topUsers: "Top foydalanuvchilar",
      recentPayments: "So'nggi to'lovlar",
      userDetails: "Foydalanuvchi tafsilotlari",
      overview: "Umumiy ko'rinish",
      testActivity: "Test faoliyati",
      paymentHistory: "To'lovlar tarixi",
      mistakesHistory: "Xatolar tarixi",

      // Student details
      contactInfo: "Aloqa ma'lumotlari",
      registeredDate: "Ro'yxatdan o'tgan sana",
      currentPlan: "Joriy plan",
      planExpiry: "Plan tugash sanasi",
      quickStats: "Tezkor statistika",
      successRate: "Muvaffaqiyat darajasi",
      testsCompleted: "Bajarilgan testlar",
      averageCorrect: "O'rtacha to'g'ri javoblar",
      testPerformance: "Test natijalari",

      // Test persistence
      testSession: "Test sessiyasi",
      resumeTest: "Testni davom ettirish",
      testProgress: "Test jarayoni",
      answeredQuestions: "Javob berilgan savollar",
      remainingQuestions: "Qolgan savollar",
      sessionSaved: "Sessiya saqlandi",
      sessionLoaded: "Sessiya yuklandi",
      completedQuestions: "Tugallangan savollar",
      finishTestPrompt: "Testni tugatish uchun barcha savollarga javob bering",

      // Navigation and UI
      backToDashboard: "Dashboardga qaytish",
      viewDetails: "Tafsilotlarni ko'rish",
      refresh: "Yangilash",
      filter: "Filtr",
      search: "Qidirish",
      export: "Eksport",
      print: "Chop etish",
      download: "Yuklab olish",

      // Status and states
      active: "Faol",
      inactive: "Nofaol",
      pending: "Kutilmoqda",
      completed: "Tugallangan",
      failed: "Muvaffaqiyatsiz",
      expired: "Muddati tugagan",

      // Form labels
      username: "Foydalanuvchi nomi",
      fullName: "To'liq ismi",
      status: "Holat",
      planType: "Plan turi",
      joinDate: "Qo'shilish sanasi",
      lastActivity: "So'nggi faollik",

      // Buttons and actions
      viewProfile: "Profilni ko'rish",
      editUser: "Foydalanuvchini tahrirlash",
      deleteUser: "Foydalanuvchini o'chirish",
      blockUser: "Foydalanuvchini bloklash",
      unblockUser: "Blokdan chiqarish",
      resetPassword: "Parolni tiklash",

      // Pagination
      page: "Sahifa",
      previous: "Oldingi",
      next: "Keyingi",
      showingResults: "Natijalar ko'rsatilmoqda",
      of: "dan",

      // Messages
      noDataFound: "Ma'lumot topilmadi",
      loadingData: "Ma'lumotlar yuklanmoqda",
      errorLoadingData: "Ma'lumotlarni yuklashda xatolik",
      actionCompleted: "Amal muvaffaqiyatli bajarildi",
      actionFailed: "Amalni bajarishda xatolik",
      confirmAction: "Amalni tasdiqlaysizmi?",

      // Time and dates
      today: "Bugun",
      yesterday: "Kecha",
      thisWeek: "Shu hafta",
      thisMonth: "Shu oy",
      lastMonth: "O'tgan oy",
      thisYear: "Shu yil",

      // Login improvements
      clientLogin: "Mijoz sifatida kirish",
      adminLogin: "Admin sifatida kirish",
      switchToClient: "Mijoz paneliga o'tish",
      switchToAdmin: "Admin paneliga o'tish",
      loginAs: "Sifatida kirish",
    },
  },
  ru: {
    translation: {
      // Navigation
      home: "Главная",
      templates: "Шаблоны",
      mistakes: "Ошибки",
      profile: "Профиль",
      testFailed: "Тест завершен неудачно",
      tooManyMistakes: "Вы сделали более 3 ошибок. Тест остановлен.",
      finalResult: "Итоговый результат",
      correctAnswers: "Правильные ответы",
      wrongAnswers: "Неправильные ответы",
      totalAnswered: "Всего ответов",
      backToTemplates: "Вернуться к шаблонам",
      questionsNavigation: "Навигация по вопросам",
      selectAnswer: "Выберите ответ",
      current: "Текущий",
      unanswered: "Без ответа",

      // Mistakes sahifasi uchun
      noMistakesYet: "Пока нет ошибок",
      keepItUp: "Так держать!",
      analyzeMistakes: "Анализируйте свои ошибки и повышайте знания",

      // Loading optimizatsiyasi uchun
      loadingTemplates: "Загрузка шаблонов...",
      templatesLoaded: "Шаблоны загружены",

      // Profile sahifasi yangi achievements
      testEnthusiast: "Энтузиаст тестов",
      testEnthusiastDesc: "Пройдите 10 тестов",
      teacher: "Учитель",
      teacherDesc: "Достигните 80% успеха",
      knowledgeable: "Знающий",
      knowledgeableDesc: "Дайте 50 правильных ответов",
      marathonRunner: "Марафонец",
      marathonRunnerDesc: "Пройдите 100 тестов",

      // Umumiy
      excellent: "Отлично!",
      noMistakes: "У вас нет ошибок!",
      continueText: "Продолжайте и делайте больше тестов!",
      explanation: "Объяснение",
      piece: "шт",

      // Home Page
      welcome: "Добро пожаловать в  AvtoTest Test System",
      homeDescription: "Профессиональная платформа для решения тестов",
      startTesting: "Начать Тестирование",
      viewTemplates: "Просмотреть Шаблоны",
      checkMistakes: "Проверить Ошибки",
      viewProfile: "Просмотреть Профиль",

      // Templates Page
      templatesTitle: "Тестовые Шаблоны",
      questionsCount: "вопросов",
      startTest: "Начать Тест",

      // Test Page
      question: "Вопрос",
      of: "из",
      nextQuestion: "Следующий Вопрос",
      finishTest: "Завершить Тест",
      correct: "Правильно!",
      incorrect: "Неправильно!",
      correctAnswer: "Правильный ответ:",

      // Mistakes Page
      mistakesTitle: "Ваши Ошибки",
      noMistakes: "Вы пока не сделали ни одной ошибки!",
      templateName: "Название шаблона",
      yourAnswer: "Ваш ответ",
      rightAnswer: "Правильный ответ",
      date: "Дата",

      // Profile Page
      profileTitle: "Информация Профиля",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Телефон",
      statistics: "Статистика",
      totalTests: "Всего тестов",
      correctAnswers: "Правильные ответы",
      wrongAnswers: "Неправильные ответы",
      successRate: "Процент успеха",

      // Auth
      login: "Войти",
      register: "Регистрация",
      password: "Пароль",
      confirmPassword: "Подтвердите пароль",
      logout: "Выйти",

      // Common
      loading: "Загрузка...",
      error: "Произошла ошибка",
      tryAgain: "Попробовать снова",
      back: "Назад",
      submit: "Отправить",

      // Additional texts for Home page
      testDescription: "Просмотр тестовых шаблонов и начало тестирования",
      mistakesDescription: "Просмотр и анализ ваших ошибок",
      profileDescription: "Личная информация и статистика",
      personalInfo: "Личная информация и статистика результатов тестов",
      featuredTitle1: "Целевое Обучение",
      featuredDesc1:
        "Каждый тест предназначен для повышения вашего уровня знаний",
      featuredTitle2: "Отслеживание Прогресса",
      featuredDesc2: "Следите за своим развитием через статистику",
      featuredTitle3: "Широкий Охват",
      featuredDesc3: "База тысяч вопросов по различным темам",
      viewMore: "Подробнее",
      testQuestions: "Тестовые вопросы",
      languageVariants: "Языковые варианты",
      availability: "Доступность",

      // Templates page
      chooseTemplate:
        "Выберите подходящий для вас тестовый шаблон и проверьте свои знания",
      noTemplatesFound: "Шаблоны не найдены",
      noTemplatesDesc: "Тестовые шаблоны на выбранном языке недоступны",
      template: "Шаблон",
      piece: "",
      questionCount2: "Количество вопросов:",
      language: "Язык:",
      testInfo: "Информация о тесте",
      testInfoDesc:
        "Каждый тестовый шаблон содержит вопросы по различным темам. В процессе тестирования вам нужно ответить на каждый вопрос. При неправильном ответе показывается правильный ответ и это сохраняется в разделе ошибок.",
      easyStart: "Легкое Начало",
      easyStartDesc: "Выберите шаблон и сразу начните тестирование",
      variousTopics: "Различные Темы",
      variousTopicsDesc: "Широкий спектр тестовых вопросов по разным областям",
      multiLanguage: "Многоязычность",
      multiLanguageDesc:
        "Возможность тестирования на узбекском, русском и других языках",

      // Test page
      questionLabel: "Вопрос:",
      confirmAnswer: "Подтвердить Ответ",

      // Mistakes page
      analyzeMistakes: "Анализируйте свои ошибки и укрепляйте знания",
      excellent: "Отлично! Никаких ошибок нет",
      continueText: "Продолжайте решать тесты и дальше повышайте свои знания!",
      totalMistakes: "Всего ошибок",
      differentTemplates: "Разные шаблоны",
      explanation: "Объяснение",
      learningTips: "Советы по обучению",
      repeat: "Повторите",
      repeatDesc: "Повторно изучите темы, по которым допустили ошибки",
      deepLearning: "Глубокое изучение",
      deepLearningDesc:
        "Получите дополнительную информацию по темам с неправильными ответами",
      practice: "Практикуйтесь",
      practiceDesc: "Решайте больше похожих тестов",

      // Profile page
      specialist: "Специалист",
      skilled: "Квалифицированный",
      good: "Хорошо",
      average: "Средний",
      beginner: "Новичок",
      registeredDate: "Дата регистрации",
      unknownDate: "Неизвестно",
      overallSuccess: "Общий успех",
      correctPercentage: "Правильные ответы",
      wrongPercentage: "Неправильные ответы",
      achievements: "Достижения",
      testEnthusiast: "Любитель Тестов",
      testEnthusiastDesc: "Решите 10 тестов",
      teacher: "Учитель",
      teacherDesc: "80% успеха",
      knowledgeable: "Знающий",
      knowledgeableDesc: "50 правильных ответов",
      marathonRunner: "Марафонец",
      marathonRunnerDesc: "Решите 100 тестов",

      // Auth pages
      welcomeToIntalim: "Вход в AvtoTest",
      welcomeDesc: "Добро пожаловать в тестовую систему",
      enterPhone: "90 123 45 67",
      enterName: "Введите ваше имя",
      enterLastname: "Введите вашу фамилию",
      enterPassword: "Введите ваш пароль",
      repeatPassword: "Повторите пароль",
      minChars: "Минимум 6 символов",
      accountExists: "У вас есть аккаунт?",
      noAccount: "У вас нет аккаунта?",
      signUp: "Зарегистрироваться",
      signIn: "Войти",
      createAccount: "Регистрация",
      createAccountDesc: "Создайте новый аккаунт и начните тестирование",
      quickStart: "Быстрый Старт",
      secure: "Безопасно",
      progress: "Прогресс",
      questions: "Вопросы",
      languages: "Языки",

      // Validation messages
      phoneValidation: "Номер телефона должен состоять из 8 цифр",
      passwordValidation: "Пароль должен содержать минимум 6 символов",
      nameValidation: "Введите имя и фамилию",
      passwordMismatch: "Пароли не совпадают",
      loginSuccess: "Успешный вход!",
      registerSuccess: "Успешная регистрация!",
      testFinished: "Тест успешно завершен!",
      selectAnswer: "Пожалуйста, выберите ответ",
      // Admin panel translations
      adminPanel: "Панель администратора",
      systemManagement: "Управление системой",
      dashboard: "Панель управления",
      students: "Студенты",
      payments: "Платежи",
      analytics: "Аналитика",
      totalUsers: "Всего пользователей",
      proUsers: "PRO пользователи",
      todayRevenue: "Сегодняшний доход",
      monthlyRevenue: "Месячный доход",
      topUsers: "Топ пользователи",
      recentPayments: "Последние платежи",
      userDetails: "Детали пользователя",
      overview: "Обзор",
      testActivity: "Активность тестов",
      paymentHistory: "История платежей",
      mistakesHistory: "История ошибок",

      // Student details
      contactInfo: "Контактная информация",
      registeredDate: "Дата регистрации",
      currentPlan: "Текущий план",
      planExpiry: "Срок действия плана",
      quickStats: "Быстрая статистика",
      successRate: "Процент успеха",
      testsCompleted: "Тесты завершены",
      averageCorrect: "Средние правильные ответы",
      testPerformance: "Результаты тестов",

      // Test persistence
      testSession: "Сессия теста",
      resumeTest: "Продолжить тест",
      testProgress: "Прогресс теста",
      answeredQuestions: "Отвеченные вопросы",
      remainingQuestions: "Оставшиеся вопросы",
      sessionSaved: "Сессия сохранена",
      sessionLoaded: "Сессия загружена",
      completedQuestions: "Завершенные вопросы",
      finishTestPrompt: "Ответьте на все вопросы, чтобы завершить тест",

      // Navigation and UI
      backToDashboard: "Вернуться к панели",
      viewDetails: "Посмотреть детали",
      refresh: "Обновить",
      filter: "Фильтр",
      search: "Поиск",
      export: "Экспорт",
      print: "Печать",
      download: "Скачать",

      // Status and states
      active: "Активный",
      inactive: "Неактивный",
      pending: "В ожидании",
      completed: "Завершено",
      failed: "Неудачно",
      expired: "Истек",

      // Form labels
      username: "Имя пользователя",
      fullName: "Полное имя",
      status: "Статус",
      planType: "Тип плана",
      joinDate: "Дата присоединения",
      lastActivity: "Последняя активность",

      // Buttons and actions
      viewProfile: "Посмотреть профиль",
      editUser: "Редактировать пользователя",
      deleteUser: "Удалить пользователя",
      blockUser: "Заблокировать пользователя",
      unblockUser: "Разблокировать",
      resetPassword: "Сбросить пароль",

      // Pagination
      page: "Страница",
      previous: "Предыдущая",
      next: "Следующая",
      showingResults: "Показаны результаты",
      of: "из",

      // Messages
      noDataFound: "Данные не найдены",
      loadingData: "Загрузка данных",
      errorLoadingData: "Ошибка загрузки данных",
      actionCompleted: "Действие успешно выполнено",
      actionFailed: "Ошибка выполнения действия",
      confirmAction: "Подтвердить действие?",

      // Time and dates
      today: "Сегодня",
      yesterday: "Вчера",
      thisWeek: "На этой неделе",
      thisMonth: "В этом месяце",
      lastMonth: "В прошлом месяце",
      thisYear: "В этом году",

      // Login improvements
      clientLogin: "Войти как клиент",
      adminLogin: "Войти как администратор",
      switchToClient: "Переключиться на клиентскую панель",
      switchToAdmin: "Переключиться на панель администратора",
      loginAs: "Войти как",
    },
  },
  uz_kiril: {
    translation: {
      // Navigation
      home: "Бош саҳифа",
      templates: "Шаблонлар",
      mistakes: "Хатолар",
      profile: "Профил",
      mistakes: "Хаталар",
      testFailed: "Тест муваффақиятсиз тугади",
      tooManyMistakes: "Сиз 3 тадан ортиқ хато қилдингиз. Тест тўхтатилди.",
      finalResult: "Якуний натижа",
      correctAnswers: "Тўғри жавоблар",
      wrongAnswers: "Нотўғри жавоблар",
      totalAnswered: "Жами жавоблар",
      backToTemplates: "Шаблонларга қайтиш",
      questionsNavigation: "Саволлар навигацияси",
      selectAnswer: "Жавобни танланг",
      current: "Жорий",
      unanswered: "Жавобсиз",

      // Mistakes sahifasi uchun
      noMistakesYet: "Ҳозирча ҳеч қандай хато йўқ",
      keepItUp: "Давом етинг!",
      analyzeMistakes:
        "Ўз хаталарингизни таҳлил қилинг ва билимларингизни ошириш",

      // Loading optimizatsiyasi uchun
      loadingTemplates: "Шаблонлар юкланмоқда...",
      templatesLoaded: "Шаблонлар юкланди",

      // Profile sahifasi yangi achievements
      testEnthusiast: "Тест ишқибози",
      testEnthusiastDesc: "10 та тест ишлаб чиқинг",
      teacher: "Ўқитувчи",
      teacherDesc: "80% муваффақият даражасига еришинг",
      knowledgeable: "Билимдон",
      knowledgeableDesc: "50 та тўғри жавоб беринг",
      marathonRunner: "Марафон югурувчиси",
      marathonRunnerDesc: "100 та тест бажаринг",

      // Umumiy
      excellent: "Ажойиб!",
      noMistakes: "Сизда ҳеч қандай хато йўқ!",
      continueText: "Давом етинг ва кўпроқ тест бажаринг!",
      explanation: "Тушунтириш",
      piece: "та",
      // Home Page
      welcome: " AvtoTest     Тест Тизимига Хуш Келибсиз",
      homeDescription: "Профессионал тест ечиш платформаси",
      startTesting: "Тестни Бошлаш",
      viewTemplates: "Шаблонларни Кўриш",
      checkMistakes: "Хатоларни Кўриш",
      viewProfile: "Профилни Кўриш",

      // Templates Page
      templatesTitle: "Тест Шаблонлари",
      questionsCount: "та савол",
      startTest: "Тестни Бошлаш",

      // Test Page
      question: "Савол",
      of: "дан",
      nextQuestion: "Кейинги Савол",
      finishTest: "Тестни Якунлаш",
      correct: "Тўғри!",
      incorrect: "Нотўғри!",
      correctAnswer: "Тўғри жавоб:",

      // Mistakes Page
      mistakesTitle: "Сизнинг Хатоларингиз",
      noMistakes: "Сиз ҳали ҳеч қандай хато қилмагансиз!",
      templateName: "Шаблон номи",
      yourAnswer: "Сизнинг жавобингиз",
      rightAnswer: "Тўғри жавоб",
      date: "Сана",

      // Profile Page
      profileTitle: "Профил Маълумотлари",
      firstName: "Исм",
      lastName: "Фамилия",
      phone: "Телефон",
      statistics: "Статистика",
      totalTests: "Жами тестлар",
      correctAnswers: "Тўғри жавоблар",
      wrongAnswers: "Нотўғри жавоблар",
      successRate: "Муваффақият фоизи",

      // Auth
      login: "Кириш",
      register: "Рўйхатдан ўтиш",
      password: "Парол",
      confirmPassword: "Паролни тасдиқлаш",
      logout: "Чиқиш",

      // Common
      loading: "Юкланмоқда...",
      error: "Хатолик юз берди",
      tryAgain: "Қайта уриниш",
      back: "Орқага",
      submit: "Юбориш",

      // Additional texts
      testDescription: "Тест шаблонларини кўриш ва тест ечишни бошлаш",
      mistakesDescription: "Қилган хатоларингизни кўриш ва таҳлил қилиш",
      profileDescription: "Шахсий маълумотлар ва статистикаларни кўриш",
      personalInfo: "Шахсий маълумотлар ва тест натижалари статистикаси",
      featuredTitle1: "Мақсадли Таълим",
      featuredDesc1:
        "Ҳар бир тест сизнинг билим даражангизни ошириш учун мўлжалланган",
      featuredTitle2: "Тараққиёт Кузатуви",
      featuredDesc2: "Статистикалар орқали ўз ривожланишингизни кузатиб боринг",
      featuredTitle3: "Кенг Қамровли",
      featuredDesc3: "Турли мавзулар бўйича минглаб саволлар базаси",
      viewMore: "Кўпроқ",
      testQuestions: "Тест саволлари",
      languageVariants: "Тил вариантлари",
      availability: "Доступлик",

      // Templates page
      chooseTemplate:
        "Ўзингизга мос тест шаблонини танланг ва билимларингизни синаб кўринг",
      noTemplatesFound: "Шаблонлар топилмади",
      noTemplatesDesc: "Танланган тилда тест шаблонлари мавжуд эмас",
      template: "Шаблон",
      piece: "та",
      questionCount2: "Савол сони:",
      language: "Тил:",
      testInfo: "Тест ҳақида маълумот",
      testInfoDesc:
        "Ҳар бир тест шаблони турли мавзулар бўйича саволларни ўз ичига олади. Тест жараёнида ҳар бир саволга жавоб бериш керак. Нотўғри жавоб берганда, тўғри жавоб кўрсатилади ва бу хатолар бўлимига сақланади.",
      easyStart: "Осон Бошлаш",
      easyStartDesc: "Шаблонни танланг ва дарҳол тест ечишни бошланг",
      variousTopics: "Турли Мавзулар",
      variousTopicsDesc: "Ҳар хил соҳалар бўйича кенг қамровли тест саволлари",
      multiLanguage: "Кўп Тиллар",
      multiLanguageDesc:
        "Ўзбек, рус ва бошқа тилларда тест топшириш имкониятии",

      // Test page
      questionLabel: "Савол:",
      confirmAnswer: "Жавобни Тасдиқлаш",

      // Mistakes page
      analyzeMistakes:
        "Қилган хатоларингизни таҳлил қилинг ва билимларингизни мустаҳкамланг",
      excellent: "Ажойиб! Ҳеч қандай хато йўқ",
      continueText:
        "Тестларни ечишда давом етинг ва ўз билимларингизни янада оширинг!",
      totalMistakes: "Жами хатолар",
      differentTemplates: "Турли шаблонлар",
      explanation: "Тушунтириш",
      learningTips: "Ўрганиш бўйича маслаҳатлар",
      repeat: "Такрорланг",
      repeatDesc: "Хато қилган мавзуларни қайта ўрганинг ва такрорланг",
      deepLearning: "Чуқур ўрганинг",
      deepLearningDesc:
        "Нотўғри жавоб берган мавзулар бўйича қўшимча маълумот олинг",
      practice: "Амалиёт қилинг",
      practiceDesc: "Ўхшаш тестларни кўпроқ ечиб кўринг",

      // Profile page
      specialist: "Мутахассис",
      skilled: "Малакали",
      good: "Яхши",
      average: "Ўртача",
      beginner: "Янги бошловчи",
      registeredDate: "Рўйхатдан ўтган",
      unknownDate: "Маълум емас",
      overallSuccess: "Умумий муваффақият",
      correctPercentage: "Тўғри жавоблар",
      wrongPercentage: "Нотўғри жавоблар",
      achievements: "Ютуқлар",
      testEnthusiast: "Тест Ишқибози",
      testEnthusiastDesc: "10 та тест ечинг",
      teacher: "Устоз",
      teacherDesc: "80% муваффақият",
      knowledgeable: "Билимдон",
      knowledgeableDesc: "50 та тўғри жавоб",
      marathonRunner: "Марафон Ўтказувчи",
      marathonRunnerDesc: "100 та тест ечинг",

      // Auth pages
      welcomeToIntalim: " AvtoTest    га кириш",
      welcomeDesc: "Тест тизимига хуш келибсиз",
      enterPhone: "90 123 45 67",
      enterName: "Исмингизни киритинг",
      enterLastname: "Фамилияингизни киритинг",
      enterPassword: "Паролингизни киритинг",
      repeatPassword: "Паролни такрорланг",
      minChars: "Камида 6 та белги",
      accountExists: "Ҳисобингиз борми?",
      noAccount: "Ҳисобингиз йўқми?",
      signUp: "Рўйхатдан ўтинг",
      signIn: "Кириш",
      createAccount: "Рўйхатдан ўтиш",
      createAccountDesc: "Янги ҳисоб яратинг ва тестларни бошланг",
      quickStart: "Тез Бошлаш",
      secure: "Хавфсиз",
      progress: "Тараққиёт",
      questions: "Саволлар",
      languages: "Тиллар",

      // Validation messages
      phoneValidation: "Телефон рақами 8 та рақамдан иборат бўлиши керак",
      passwordValidation: "Парол камида 6 та белгидан иборат бўлиши керак",
      nameValidation: "Исм ва фамилияни киритинг",
      passwordMismatch: "Пароллар мос келмайди",
      loginSuccess: "Муваффақиятли кирдингиз!",
      registerSuccess: "Муваффақиятли рўйхатдан ўтдингиз!",
      testFinished: "Тест муваффақиятли якунланди!",
      selectAnswer: "Илтимос жавобни танланг",
      // Admin panel translations
      adminPanel: "Админ панел",
      systemManagement: "Тизим бошқаруви",
      dashboard: "Бошқарув панели",
      students: "Талабалар",
      payments: "Тўловлар",
      analytics: "Таҳлил",
      totalUsers: "Жами фойдаланувчилар",
      proUsers: "PRO фойдаланувчилар",
      todayRevenue: "Бугунги даромад",
      monthlyRevenue: "Ойлик даромад",
      topUsers: "Топ фойдаланувчилар",
      recentPayments: "Сўнгги тўловлар",
      userDetails: "Фойдаланувчи тафсилотлари",
      overview: "Умумий кўриниш",
      testActivity: "Тест фаоллиги",
      paymentHistory: "Тўловлар тарихи",
      mistakesHistory: "Хатолар тарихи",

      // Test persistence
      testSession: "Тест сессияси",
      resumeTest: "Тестни давом еттириш",
      testProgress: "Тест жараёни",
      answeredQuestions: "Жавоб берилган саволлар",
      completedQuestions: "Тугалланган саволлар",
      finishTestPrompt: "Тестни тугатиш учун барча саволларга жавоб беринг",

      // Login improvements
      clientLogin: "Мижоз сифатида кириш",
      adminLogin: "Админ сифатида кириш",
      switchToClient: "Мижоз панелига ўтиш",
      switchToAdmin: "Админ панелига ўтиш",
    },
  },
  kaa: {
    translation: {
      // Navigation
      home: "Bas bet",
      templates: "Shablonlar",
      mistakes: "Qátеlikler",
      profile: "Profil",

      mistakes: "Qátelikler",
      testFailed: "Test sátsiz bitti",
      tooManyMistakes: "Siz 3 tadan artıq qátelik jasadıńız. Test toqtatıldı.",
      finalResult: "Aqırģı nátiyje",
      correctAnswers: "Durıs juwaplar",
      wrongAnswers: "Qáte juwaplar",
      totalAnswered: "Barsha juwaplar",
      backToTemplates: "Shablonlarģa qaytıw",
      questionsNavigation: "Sawallar nawigaciyası",
      selectAnswer: "Juwaptı saylań",
      current: "Házirgi",
      unanswered: "Juwapsız",

      // Mistakes sahifasi uchun
      noMistakesYet: "Házirshede esh qanday qáte joq",
      keepItUp: "Dawam etiń!",
      analyzeMistakes: "Óz qáteliklerinizdi tallań hám bilimińizdi arttırıń",

      // Loading optimizatsiyasi uchun
      loadingTemplates: "Shablonlar júklenmekte...",
      templatesLoaded: "Shablonlar júklendi",

      // Profile sahifasi yangi achievements
      testEnthusiast: "Test máhebkeri",
      testEnthusiastDesc: "10 test jasań",
      teacher: "Mugalım",
      teacherDesc: "80% jetiskerlik dárejesine jetiń",
      knowledgeable: "Bilimli",
      knowledgeableDesc: "50 durıs juwap beriń",
      marathonRunner: "Marafon júgirishisi",
      marathonRunnerDesc: "100 test jasań",

      // Umumiy
      excellent: "Keremet!",
      noMistakes: "Sizde esh qanday qáte joq!",
      continueText: "Dawam etiń hám kóbirek test jasań!",
      explanation: "Túsindiriw",
      piece: "dana",
      // Home Page
      welcome: " AvtoTest     Test Sistemasına Xosh Kelipsiz",
      homeDescription: "Professional test sheshiw platforması",
      startTesting: "Testni Baslaw",
      viewTemplates: "Shablonlardı Kóriw",
      checkMistakes: "Qátеliklеrdi Kóriw",
      viewProfile: "Profildi Kóriw",

      // Templates Page
      templatesTitle: "Test Shablonları",
      questionsCount: "ta soraw",
      startTest: "Testni Baslaw",

      // Test Page
      question: "Soraw",
      of: "dan",
      nextQuestion: "Keyingi Soraw",
      finishTest: "Testni Tamamlaw",
      correct: "Duris!",
      incorrect: "Nadúris!",
      correctAnswer: "Duris juwap:",

      // Mistakes Page
      mistakesTitle: "Sizdiń Qátеliklеriźiz",
      noMistakes: "Siz áli hesh qanday qátelik jasalmadıńız!",
      templateName: "Shablon atı",
      yourAnswer: "Sizdiń juwabıńız",
      rightAnswer: "Duris juwap",
      date: "Sáne",

      // Profile Page
      profileTitle: "Profil Málumatlаrı",
      firstName: "At",
      lastName: "Familiya",
      phone: "Telefon",
      statistics: "Statistika",
      totalTests: "Barlıq testler",
      correctAnswers: "Duris juwaplar",
      wrongAnswers: "Nadúris juwaplar",
      successRate: "Tabıslılıq payızı",

      // Auth
      login: "Kiriw",
      register: "Dizimnen ótiw",
      password: "Parol",
      confirmPassword: "Paroldi tastıyıqlaw",
      logout: "Shıǵıw",

      // Common
      loading: "Júklenip atır...",
      error: "Qátelik júz berdi",
      tryAgain: "Qayta urınıw",
      back: "Artqa",
      submit: "Jiberiw",

      // Additional texts for Home page
      testDescription: "Test shablonların kóriw hám test sheshiwdi baslaw",
      mistakesDescription: "Jasalǵan qátelikleriń kóriw hám tahlil qılıw",
      profileDescription: "Jeke málumatlаr hám statistikalarıń kóriw",
      personalInfo: "Jeke málumatlаr hám test nátiyjeleri statistikası",
      featuredTitle1: "Maqsetli Táliym",
      featuredDesc1:
        "Hár bir test sizdiń bilim dárejesizdi ashırıw úshin móljellengen",
      featuredTitle2: "Taraqıyat Kuzatıwı",
      featuredDesc2: "Statistikalar arqalı óz riyvojlanıwıńızdı kuzatıp barıń",
      featuredTitle3: "Keń Qamrawlı",
      featuredDesc3: "Túrli mawzular boyınsha mıńlаǵan sorawlar bazası",
      viewMore: "Kóprek",
      testQuestions: "Test sorawları",
      languageVariants: "Til variantları",
      availability: "Qoljetimdilik",

      // Templates page
      chooseTemplate:
        "Ózińizge tuwra kelgen test shablonın tallaś hám bilimlerigizdi sınap kóriń",
      noTemplatesFound: "Shablonlar tabılmadı",
      noTemplatesDesc: "Tallanǵan tilde test shablonları joq",
      template: "Shablon",
      piece: "ta",
      questionCount2: "Soraw sanı:",
      language: "Til:",
      testInfo: "Test haqqında málumаt",
      testInfoDesc:
        "Hár bir test shablonı túrli mawzular boyınsha sorawlardı óz ishige aladı. Test jarayonında hár bir sorawǵa juwap beriw kerek. Nadurıs juwap bergende, duris juwap kórsetiledi hám bul qátelikler bólimine saqlanadı.",
      easyStart: "Jeńil Baslaw",
      easyStartDesc: "Shablonın tallaś hám darhal test sheshiwdi baslaś",
      variousTopics: "Túrli Mawzular",
      variousTopicsDesc:
        "Hár túrli salalar boyınsha keń qamrawlı test sorawları",
      multiLanguage: "Kóp Tiller",
      multiLanguageDesc:
        "Qaraqalpaq, ózbekсhe, russha hám basqa tillerde test tapsırıw múmkinshilik",

      // Test page
      questionLabel: "Soraw:",
      confirmAnswer: "Juwaptı Tastıyıqlaw",

      // Mistakes page
      analyzeMistakes:
        "Jasalǵan qáteliklerińdi tahlil qılıń hám bilimlerińdi mustahkemleń",
      excellent: "Ajoyıp! Hesh qanday qátelik joq",
      continueText:
        "Testlerdi sheshiwde dawam etiń hám óz bilimlerińdi jaqsılap barıń!",
      totalMistakes: "Barlıq qátelikler",
      differentTemplates: "Túrli shablonlar",
      explanation: "Túsindiriw",
      learningTips: "Úyreniw boyınsha kеńеsler",
      repeat: "Qaytalań",
      repeatDesc: "Qátelik jasalǵan mawzulardı qayta úyreniń hám qaytalań",
      deepLearning: "Terek úyreniw",
      deepLearningDesc:
        "Nadurıs juwap bergen mawzular boyınsha qosımsha málumаt alıń",
      practice: "Ámeliyat qılıń",
      practiceDesc: "Usı sıyaqlı testlerdi kóprek sheship kóriń",

      // Profile page
      specialist: "Mutaxassis",
      skilled: "Bilimli",
      good: "Jaqsı",
      average: "Ortasha",
      beginner: "Jaña baslawshı",
      registeredDate: "Dizimnen ótken",
      unknownDate: "Belgisiz",
      overallSuccess: "Umumiy tabıslılıq",
      correctPercentage: "Duris juwaplar",
      wrongPercentage: "Nadurıs juwaplar",
      achievements: "Jetiskеnlikler",
      testEnthusiast: "Test Suyiwshi",
      testEnthusiastDesc: "10 ta test sheshiń",
      teacher: "Mugalim",
      teacherDesc: "80% tabıslılıq",
      knowledgeable: "Bilimli",
      knowledgeableDesc: "50 ta duris juwap",
      marathonRunner: "Maraton Ótkeriushisi",
      marathonRunnerDesc: "100 ta test sheshiń",

      // Auth pages
      welcomeToIntalim: " AvtoTest    ga kiriw",
      welcomeDesc: "Test sistemasına xosh kelipsiz",
      enterPhone: "90 123 45 67",
      enterName: "Atıńızdı kiritiń",
      enterLastname: "Familiyańızdı kiritiń",
      enterPassword: "Parolıńızdı kiritiń",
      repeatPassword: "Paroldı qaytalań",
      minChars: "Keminde 6 ta belgi",
      accountExists: "Hisobıńız barma?",
      noAccount: "Hisobıńız joqpa?",
      signUp: "Dizimnen ótiń",
      signIn: "Kiriw",
      createAccount: "Dizimnen ótiw",
      createAccountDesc: "Jaña hisap jaratiń hám testlerdi baslaś",
      quickStart: "Tez Baslaw",
      secure: "Qáwipsiz",
      progress: "Taraqıyat",
      questions: "Sorawlar",
      languages: "Tiller",

      // Validation messages
      phoneValidation: "Telefon nómiri 8 ta sannan ibarat bolıwı kerek",
      passwordValidation: "Parol keminde 6 ta belgiden ibarat bolıwı kerek",
      nameValidation: "At hám familiya kiritiń",
      passwordMismatch: "Paroller sáykes kelmeydi",
      loginSuccess: "Tabıslı kirdińiz!",
      registerSuccess: "Tabıslı dizimnen óttińiz!",
      testFinished: "Test tabıslı tamamlandı!",
      selectAnswer: "Juwaptı tallaśıńızdı ótin etemiz",
    },
  },
  kaa_kiril: {
    translation: {
      // Navigation
      home: "Бас бет",
      templates: "Шаблонлар",
      mistakes: "Қателиклер",
      profile: "Профил",

      // Home Page
      welcome: " AvtoTest     Тест Системасына Хош Келипсиз",
      homeDescription: "Профессионал тест шешив платформасы",
      startTesting: "Тестни Баслав",
      viewTemplates: "Шаблонларды Көрив",
      checkMistakes: "Қателикларди Көрив",
      viewProfile: "Профилди Көрив",

      // Templates Page
      templatesTitle: "Тест Шаблонлары",
      questionsCount: "та сорав",
      startTest: "Тестни Баслав",

      // Test Page
      question: "Сорав",
      of: "дан",
      nextQuestion: "Кейинги Сорав",
      finishTest: "Тестни Тамамлав",
      correct: "Дурис!",
      incorrect: "Надурис!",
      correctAnswer: "Дурис жуваб:",

      // Mistakes Page
      mistakesTitle: "Сиздиң Қателикларизиз",
      noMistakes: "Сиз әли хеш қандай қателик жасалмадыңыз!",
      templateName: "Шаблон аты",
      yourAnswer: "Сиздиң жувабыңыз",
      rightAnswer: "Дурис жуваб",
      date: "Сәне",

      // Profile Page
      profileTitle: "Профил Мәлуматлары",
      firstName: "Ат",
      lastName: "Фамилия",
      phone: "Телефон",
      statistics: "Статистика",
      totalTests: "Барлық тестлер",
      correctAnswers: "Дурис жуваплар",
      wrongAnswers: "Надурис жуваплар",
      successRate: "Табыслылық фоизи",

      // Auth
      login: "Кирив",
      register: "Дизимнен өтив",
      password: "Парол",
      confirmPassword: "Паролди тастыйыклав",
      logout: "Шығыв",

      // Common
      loading: "Жүкленип атыр...",
      error: "Қателик жүз берди",
      tryAgain: "Қайта урыныв",
      back: "Артқа",
      submit: "Жиберив",

      // Additional texts for Home page
      testDescription: "Тест шаблонларын көрив хәм тест шешивди баслав",
      mistakesDescription: "Жасалған қателиклерин көрив хәм тахлил қылыв",
      profileDescription: "Жеке мәлуматлар хәм статистикаларын көрив",
      personalInfo: "Жеке мәлуматлар хәм тест нәтийжелери статистикасы",
      featuredTitle1: "Мақсетли Тәлийм",
      featuredDesc1:
        "Хәр бир тест сиздиң билим дәрежесизди ашырыв үшин мөлжелленген",
      featuredTitle2: "Тараққыят Кузатывы",
      featuredDesc2: "Статистикалар арқалы өз рийвожланывыңызды кузатып барың",
      featuredTitle3: "Кең Қамравлы",
      featuredDesc3: "Түрли мавзулар бойынша мыңлаған сораулар базасы",
      viewMore: "Көпрек",
      testQuestions: "Тест сораулары",
      languageVariants: "Тил вариантлары",
      availability: "Қолжетимдилик",

      // Templates page
      chooseTemplate:
        "Өзиңизге тувра келген тест шаблонын талласы хәм билимлеригизди сынап көриң",
      noTemplatesFound: "Шаблонлар табылмады",
      noTemplatesDesc: "Талланған тилде тест шаблонлары жоқ",
      template: "Шаблон",
      piece: "та",
      questionCount2: "Сорав саны:",
      language: "Тил:",
      testInfo: "Тест хаққында мәлумат",
      testInfoDesc:
        "Хәр бир тест шаблоны түрли мавзулар бойынша сораукарды өз ишиге алады. Тест жарайонында хәр бир сорауға жуваб берив керек. Надурыс жуваб бергенде, дурыс жуваб көрсетиледи хәм бул қателиклер бөлимине сақланады.",
      easyStart: "Жеңил Баслав",
      easyStartDesc: "Шаблонын талласы хәм дархал тест шешивди басласы",
      variousTopics: "Түрли Мавзулар",
      variousTopicsDesc:
        "Хәр түрли салалар бойынша кең қамравлы тест сораулары",
      multiLanguage: "Көп Тиллер",
      multiLanguageDesc:
        "Қарақалпақ, өзбекше, русша хәм басқа тилларде тест тапсырыв мүмкиншилик",

      // Test page
      questionLabel: "Сорав:",
      confirmAnswer: "Жувапты Тастыйыклав",

      // Mistakes page
      analyzeMistakes:
        "Жасалған қателикларинди тахлил қылың хәм билимлариңди мустахкемлең",
      excellent: "Ажойып! Хеш қандай қателик жоқ",
      continueText:
        "Тестларди шешивде давам етиң хәм өз билимлариңди жақсылап барың!",
      totalMistakes: "Барлық қателиклер",
      differentTemplates: "Түрли шаблонлар",
      explanation: "Түсиндирив",
      learningTips: "Үйренив бойынша кеңеслер",
      repeat: "Қайталаң",
      repeatDesc: "Қателик жасалған мавзуларды қайта үйрениң хәм қайталаң",
      deepLearning: "Терең үйренив",
      deepLearningDesc:
        "Надурыс жуваб берген мавзулар бойынша қосымша мәлумат алың",
      practice: "Әмелият қылың",
      practiceDesc: "Усы сыяқлы тестларди көпрек шешип көриң",

      // Profile page
      specialist: "Мутахассис",
      skilled: "Билимли",
      good: "Жақсы",
      average: "Орташа",
      beginner: "Жаңа баславшы",
      registeredDate: "Дизимнен өткен",
      unknownDate: "Белгисиз",
      overallSuccess: "Умумий табыслылық",
      correctPercentage: "Дурыс жуваплар",
      wrongPercentage: "Надурыс жуваплар",
      achievements: "Жетискенликлер",
      testEnthusiast: "Тест Суйивши",
      testEnthusiastDesc: "10 та тест шешиң",
      teacher: "Мугалим",
      teacherDesc: "80% табыслылық",
      knowledgeable: "Билимли",
      knowledgeableDesc: "50 та дурыс жуваб",
      marathonRunner: "Марафон Өткеривши",
      marathonRunnerDesc: "100 та тест шешиң",

      // Auth pages
      welcomeToIntalim: " AvtoTest    га кирив",
      welcomeDesc: "Тест системасына хош келипсиз",
      enterPhone: "90 123 45 67",
      enterName: "Атыңызды киритиң",
      enterLastname: "Фамилияңызды киритиң",
      enterPassword: "Паролыңызды киритиң",
      repeatPassword: "Паролды қайталаң",
      minChars: "Кеминде 6 та белги",
      accountExists: "Хисабыңыз барма?",
      noAccount: "Хисабыңыз жоқпа?",
      signUp: "Дизимнен өтиң",
      signIn: "Кирив",
      createAccount: "Дизимнен өтив",
      createAccountDesc: "Жаңа хисап жаратиң хәм тестларди басласы",
      quickStart: "Тез Баслав",
      secure: "Қәвипсиз",
      progress: "Тараққыят",
      questions: "Сораулар",
      languages: "Тиллер",

      // Validation messages
      phoneValidation: "Телефон нөмири 8 та саннан ибарат болывы керек",
      passwordValidation: "Парол кеминде 6 та белгиден ибарат болывы керек",
      nameValidation: "Ат хәм фамилия киритиң",
      passwordMismatch: "Пароллер сәйкес келмейди",
      loginSuccess: "Табыслы кирдиңиз!",
      registerSuccess: "Табыслы дизимнен өттиңиз!",
      testFinished: "Тест табыслы тамамланды!",
      selectAnswer: "Жувапты талласыңызды өтин етемиз",
      // Admin panel translations
      adminPanel: "Admin panel",
      systemManagement: "Sistema basqarıwı",
      dashboard: "Basqarıw paneli",
      students: "Studentler",
      payments: "Tólewler",
      analytics: "Tahlil",
      totalUsers: "Barlıq paydalanıwshılar",
      proUsers: "PRO paydalanıwshılar",
      todayRevenue: "Búgingi kiriw",
      monthlyRevenue: "Aylıq kiriw",
      topUsers: "Top paydalanıwshılar",
      recentPayments: "Soń tólewler",
      userDetails: "Paydalanıwshı aqpanı",
      overview: "Umumiy kóriw",
      testActivity: "Test aktiwligi",
      paymentHistory: "Tólewler tarihi",
      mistakesHistory: "Qátelikler tarihi",

      // Test persistence
      testSession: "Test sessiyası",
      resumeTest: "Testni dawam ettiriw",
      testProgress: "Test barawı",
      answeredQuestions: "Juwap berilgen sorawlar",
      completedQuestions: "Tamamlanģan sorawlar",
      finishTestPrompt: "Testni tamamlaw úshin barlıq sorawlarģa juwap beriň",

      // Login improvements
      clientLogin: "Mijoz sıpatında kiriw",
      adminLogin: "Admin sıpatında kiriw",
      switchToClient: "Mijoz paneliga ótiw",
      switchToAdmin: "Admin paneliga ótiw",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz", // Default language
  fallbackLng: "uz", // Fallback language if translation not found

  // Detection options
  detection: {
    order: ["localStorage", "navigator", "htmlTag"],
    caches: ["localStorage"],
  },

  interpolation: {
    escapeValue: false, // React already escapes by default
  },

  // Debug mode for development
  debug: process.env.NODE_ENV === "development",

  // Namespace settings
  defaultNS: "translation",
  ns: ["translation"],

  // Pluralization
  pluralSeparator: "_",
  contextSeparator: "_",

  // Missing key handling
  saveMissing: false,
  missingKeyHandler: (lng, ns, key) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    }
  },

  // React specific options
  react: {
    useSuspense: false, // Disable suspense mode
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  },

  // Load settings
  load: "languageOnly", // Only load language without region
  preload: ["uz", "ru"], // Preload these languages

  // Key separator
  keySeparator: ".",
  nsSeparator: ":",

  // Retry settings
  initImmediate: false,
});

// Export language options for components
export const languageOptions = [
  {
    code: "uz",
    name: "O'zbekcha",
    nativeName: "O'zbekcha",
    flag: "🇺🇿",
    direction: "ltr",
  },
  {
    code: "ru",
    name: "Русский",
    nativeName: "Русский",
    flag: "🇷🇺",
    direction: "ltr",
  },
  {
    code: "uz_kiril",
    name: "Ўзбекча",
    nativeName: "Ўзбекча",
    flag: "🇺🇿",
    direction: "ltr",
  },
  {
    code: "kaa",
    name: "Qaraqalpaqsha",
    nativeName: "Qaraqalpaqsha",
    flag: "kaa",
    direction: "ltr",
  },
  {
    code: "kaa_kiril",
    name: "Қарақалпақша",
    nativeName: "Қарақалпақша",
    flag: "kaa",
    direction: "ltr",
  },
];

// Helper function to get current language info
export const getCurrentLanguageInfo = () => {
  const currentLang = i18n.language;
  return (
    languageOptions.find((lang) => lang.code === currentLang) ||
    languageOptions[0]
  );
};

// Helper function to change language
export const changeLanguage = (langCode) => {
  return i18n.changeLanguage(langCode);
};

// Helper function to get available languages
export const getAvailableLanguages = () => {
  return languageOptions.map((lang) => ({
    code: lang.code,
    name: lang.name,
    nativeName: lang.nativeName,
  }));
};

// Helper function to format date according to current language
export const formatDate = (date, options = {}) => {
  const currentLang = i18n.language;
  const locale = currentLang === "ru" ? "ru-RU" : "uz-UZ";

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return new Date(date).toLocaleDateString(locale, defaultOptions);
};

// Helper function to format numbers according to current language
export const formatNumber = (number, options = {}) => {
  const currentLang = i18n.language;
  const locale = currentLang === "ru" ? "ru-RU" : "uz-UZ";

  return new Intl.NumberFormat(locale, options).format(number);
};

// Custom hook for translations with additional features
export const useTranslationWithHelpers = () => {
  const { t, i18n } = useTranslation();

  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    languageInfo: getCurrentLanguageInfo(),
    changeLanguage,
    formatDate,
    formatNumber,
    availableLanguages: getAvailableLanguages(),
  };
};

export default i18n;
