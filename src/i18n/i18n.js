import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      upgradeProPlan: "PRO ga O'tish",
      signUpRegister: "Ro'yxatdan O'tish",
      pricePerMonth: "so'm/oy",
      proFeatures: "PRO Plan imkoniyatlari:",
      unlimitedTests: "Cheksiz testlar",
      allFeatures: "Barcha funksiyalar",
      premiumSupport: "Premium qo'llab-quvvatlash",
      validityPeriod: "oy amal qilish muddati",
      payViaClick: "Click orqali to'lash",
      payViaQR: "QR kod orqali to'lash",
      checkPaymentStatus: "To'lov holatini tekshirish",
      activePlan: "Faol Plan",
      choosePlan: "Test Planlarini Tanlang",
      selectPlan: "O'zingizga mos plan tanlang va test yechishni boshlang",
      forBeginners: "Boshlang'ich foydalanuvchilar uchun",
      forProfessionals: "Professional foydalanuvchilar uchun",
      popular: "Mashhur",
      testLimit: "ta test limiti",
      allLanguages: "Barcha tillar",
      errorAnalysis: "Xatolar tahlili",
      statistics: "Statistika",
      examMode: "Imtihon rejimi",
      detailedAnalysis: "Batafsil tahlil",
      planFeatures: "Plan imkoniyatlari",
      monthlyValidity: "oy amal qilish muddati",
      paymentHistory: "To'lovlar tarixi",
      totalPayments: "Jami to'lovlar",
      paymentCount: "To'lovlar soni",
      noPaymentsFound: "Hech qanday to'lov topilmadi",
      paymentSuccessful: "To'lov muvaffaqiyatli amalga oshirildi!",
      paymentFailed: "To'lov amalga oshirilmadi",
      loading: "Yuklanmoqda...",
      cancel: "Bekor qilish",
      confirm: "Tasdiqlash",
      freePlan: "BEPUL Plan",
      proPlan: "PRO Plan",
      testLimitToday: "Bugungi test limiti",
      invalidLanguage: "Noto'g'ri til tanlandi",
      invalidQuestionCount: "Test soni 20 yoki 50 bo'lishi kerak",
      noTemplatesFound: "Ushbu tilda shablonlar topilmadi",
      insufficientQuestions: "Ushbu tilda faqat {{count}} ta savol mavjud",
      examNotFound: "Imtihon topilmadi",
      examExpired: "Imtihon tugagan yoki muddati o'tgan",
      invalidQuestionIndex: "Noto'g'ri savol raqami",
      questionAlreadyAnswered: "Bu savolga allaqachon javob berilgan",
      questionNotFound: "Savol topilmadi",
      examAlreadyCompleted: "Imtihon allaqachon yakunlangan",
      paymentStatus: {
        paid: "To'langan",
        pending: "Kutilmoqda",
        failed: "Muvaffaqiyatsiz",
      },
      backToHome: "Bosh sahifaga qaytish",
      usedTests: "Ishlatilgan testlar",
      quickStart: "Tez boshlash",
      quickStartDesc:
        "Darhol test yechishni boshlang va bilimlaringizni sinab ko'ring",
      securePayment: "Xavfsiz to'lov",
      securePaymentDesc:
        "To'lovlaringiz xavfsiz va shifrlangan usulda amalga oshiriladi",
      progressTracking: "Taraqqiyot kuzatuvi",
      progressTrackingDesc:
        "O'z rivojlanishingizni real vaqt rejimida kuzatib boring",
      currentPlan: "Joriy reja",
      expiryDate: "Muddati tugash sanasi",
      plansComparison: "Rejalarni taqqoslash",
      features: "Xususiyatlar",
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
      createAccount: "Hisob yaratish",
      createAccountDesc: "Yangi hisob yarating va testlarni boshlang",
      quickStart: "Tez Boshlash",
      secure: "Xavfsiz",
      progress: "Taraqqiyot",
      questions: "Savollar",
      languages: "Tillar",

      // Validation messages
      phoneValidation: "Telefon raqami 8 ta raqamdan iborat bo'lishi kerak",
      passwordValidation: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      nameValidation: "Ism va familiya kiritilishi kerak",
      passwordMismatch: "Parollar mos kelmaydi",
      loginSuccess: "Muvaffaqiyatli kirdingiz!",
      registerSuccess: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
      testFinished: "Test muvaffaqiyatli yakunlandi!",
      selectAnswer: "Iltimos, javobni tanlang",
      // Admin panel translations
      adminPanel: "Admin paneli",
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
      userDetails: "Foydalanuvchi ma'lumotlari",
      overview: "Umumiy ko'rinish",
      testActivity: "Test faolligi",
      paymentHistory: "To'lovlar tarixi",
      mistakesHistory: "Xatolar tarixi",

      // Test persistence
      testSession: "Test sessiyasi",
      resumeTest: "Testni davom ettirish",
      testProgress: "Test jarayoni",
      answeredQuestions: "Javob berilgan savollar",
      completedQuestions: "Yakunlangan savollar",
      finishTestPrompt: "Testni yakunlash uchun barcha savollarga javob bering",

      // Login improvements
      clientLogin: "Mijoz sifatida kirish",
      adminLogin: "Admin sifatida kirish",
      switchToClient: "Mijoz paneliga o'tish",
      switchToAdmin: "Admin paneliga o'tish",
    },
  },
  ru: {
    translation: {
      upgradeProPlan: "Перейти на PRO",
      signUpRegister: "Зарегистрироваться",
      pricePerMonth: "сум/мес",
      proFeatures: "Возможности PRO плана:",
      unlimitedTests: "Неограниченные тесты",
      allFeatures: "Все функции",
      premiumSupport: "Премиум поддержка",
      validityPeriod: "срок действия в месяцах",
      payViaClick: "Оплатить через Click",
      payViaQR: "Оплатить через QR код",
      checkPaymentStatus: "Проверить статус платежа",
      activePlan: "Активный план",
      choosePlan: "Выберите план теста",
      selectPlan: "Выберите подходящий план и начните решать тесты",
      forBeginners: "Для начинающих пользователей",
      forProfessionals: "Для профессиональных пользователей",
      popular: "Популярный",
      testLimit: "лимит тестов",
      allLanguages: "Все языки",
      errorAnalysis: "Анализ ошибок",
      statistics: "Статистика",
      examMode: "Режим экзамена",
      detailedAnalysis: "Детальный анализ",
      planFeatures: "Возможности плана",
      monthlyValidity: "срок действия в месяцах",
      paymentHistory: "История платежей",
      totalPayments: "Всего платежей",
      paymentCount: "Количество платежей",
      noPaymentsFound: "Платежи не найдены",
      paymentSuccessful: "Платеж успешно выполнен!",
      paymentFailed: "Платеж не выполнен",
      loading: "Загрузка...",
      cancel: "Отмена",
      confirm: "Подтвердить",
      freePlan: "БЕСПЛАТНЫЙ План",
      proPlan: "PRO План",
      testLimitToday: "Лимит тестов на сегодня",
      invalidLanguage: "Неверный язык выбран",
      invalidQuestionCount: "Количество тестов должно быть 20 или 50",
      noTemplatesFound: "Шаблоны не найдены в этом языке",
      insufficientQuestions: "В этом языке только {{count}} вопросов доступно",
      examNotFound: "Экзамен не найден",
      examExpired: "Экзамен завершён или истёк",
      invalidQuestionIndex: "Неверный номер вопроса",
      questionAlreadyAnswered: "На этот вопрос уже дан ответ",
      questionNotFound: "Вопрос не найден",
      examAlreadyCompleted: "Экзамен уже завершён",
      paymentStatus: {
        paid: "Оплачено",
        pending: "В ожидании",
        failed: "Неудачно",
      },
      backToHome: "Вернуться на главную",
      usedTests: "Использованные тесты",
      quickStart: "Быстрый старт",
      quickStartDesc: "Немедленно начните решать тесты и проверьте свои знания",
      securePayment: "Безопасная оплата",
      securePaymentDesc:
        "Ваши платежи выполняются безопасно и в зашифрованном виде",
      progressTracking: "Отслеживание прогресса",
      progressTrackingDesc: "Следите за своим развитием в реальном времени",
      currentPlan: "Текущий план",
      expiryDate: "Дата истечения срока",
      plansComparison: "Сравнение планов",
      features: "Функции",
      // Navigation
      home: "Главная",
      templates: "Шаблоны",
      mistakes: "Ошибки",
      profile: "Профиль",
      testFailed: "Тест провален",
      tooManyMistakes: "Вы сделали более 3 ошибок. Тест остановлен.",
      finalResult: "Финальный результат",
      correctAnswers: "Правильные ответы",
      wrongAnswers: "Неправильные ответы",
      totalAnswered: "Всего ответов",
      backToTemplates: "Вернуться к шаблонам",
      questionsNavigation: "Навигация вопросов",
      selectAnswer: "Выберите ответ",
      current: "Текущий",
      unanswered: "Без ответа",

      // Для страницы ошибок
      noMistakesYet: "Пока нет ошибок",
      keepItUp: "Продолжайте!",
      analyzeMistakes: "Анализируйте свои ошибки и повышайте знания",

      // Для оптимизации загрузки
      loadingTemplates: "Загрузка шаблонов...",
      templatesLoaded: "Шаблоны загружены",

      // Новые достижения на странице профиля
      testEnthusiast: "Любитель тестов",
      testEnthusiastDesc: "Пройдите 10 тестов",
      teacher: "Учитель",
      teacherDesc: "Достичь 80% успеха",
      knowledgeable: "Знающий",
      knowledgeableDesc: "Дайте 50 правильных ответов",
      marathonRunner: "Марафонец",
      marathonRunnerDesc: "Пройдите 100 тестов",

      // Общие
      excellent: "Отлично!",
      noMistakes: "У вас нет ошибок!",
      continueText: "Продолжайте и проходите больше тестов!",
      explanation: "Объяснение",
      piece: "шт",
      // Главная страница
      welcome: "Добро пожаловать в систему тестов AvtoTest",
      homeDescription: "Профессиональная платформа для решения тестов",
      startTesting: "Начать тест",
      viewTemplates: "Просмотреть шаблоны",
      checkMistakes: "Просмотреть ошибки",
      viewProfile: "Просмотреть профиль",

      // Страница шаблонов
      templatesTitle: "Шаблоны тестов",
      questionsCount: "вопросов",
      startTest: "Начать тест",

      // Страница теста
      question: "Вопрос",
      of: "из",
      nextQuestion: "Следующий вопрос",
      finishTest: "Завершить тест",
      correct: "Правильно!",
      incorrect: "Неправильно!",
      correctAnswer: "Правильный ответ:",

      // Страница ошибок
      mistakesTitle: "Ваши ошибки",
      noMistakes: "Вы ещё не сделали ошибок!",
      templateName: "Имя шаблона",
      yourAnswer: "Ваш ответ",
      rightAnswer: "Правильный ответ",
      date: "Дата",

      // Страница профиля
      profileTitle: "Информация профиля",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Телефон",
      statistics: "Статистика",
      totalTests: "Всего тестов",
      correctAnswers: "Правильные ответы",
      wrongAnswers: "Неправильные ответы",
      successRate: "Процент успеха",

      // Авторизация
      login: "Вход",
      register: "Регистрация",
      password: "Пароль",
      confirmPassword: "Подтвердите пароль",
      logout: "Выход",

      // Общее
      loading: "Загрузка...",
      error: "Произошла ошибка",
      tryAgain: "Попробовать снова",
      back: "Назад",
      submit: "Отправить",

      // Дополнительные тексты для главной страницы
      testDescription: "Просмотреть шаблоны тестов и начать решать тест",
      mistakesDescription: "Просмотреть и анализировать сделанные ошибки",
      profileDescription: "Просмотреть личные данные и статистику",
      personalInfo: "Личные данные и статистика результатов тестов",
      featuredTitle1: "Целевое обучение",
      featuredDesc1:
        "Каждый тест предназначен для повышения вашего уровня знаний",
      featuredTitle2: "Отслеживание прогресса",
      featuredDesc2: "Следите за своим развитием через статистику",
      featuredTitle3: "Широкий охват",
      featuredDesc3: "База тысяч вопросов по различным темам",
      viewMore: "Больше",
      testQuestions: "Вопросы теста",
      languageVariants: "Варианты языков",
      availability: "Доступность",

      // Страница шаблонов
      chooseTemplate:
        "Выберите подходящий шаблон теста и проверьте свои знания",
      noTemplatesFound: "Шаблоны не найдены",
      noTemplatesDesc: "Нет шаблонов тестов на выбранном языке",
      template: "Шаблон",
      piece: "шт",
      questionCount2: "Количество вопросов:",
      language: "Язык:",
      testInfo: "Информация о тесте",
      testInfoDesc:
        "Каждый шаблон теста включает вопросы по различным темам. Во время теста вы должны ответить на каждый вопрос. При неправильном ответе показывается правильный ответ и он сохраняется в раздел ошибок.",
      easyStart: "Легкий старт",
      easyStartDesc: "Выберите шаблон и сразу начните решать тест",
      variousTopics: "Различные темы",
      variousTopicsDesc: "Широкий охват тестовых вопросов по разным областям",
      multiLanguage: "Много языков",
      multiLanguageDesc:
        "Возможность сдачи теста на узбекском, русском и других языках",

      // Страница теста
      questionLabel: "Вопрос:",
      confirmAnswer: "Подтвердить ответ",

      // Страница ошибок
      analyzeMistakes: "Анализируйте сделанные ошибки и укрепляйте знания",
      excellent: "Отлично! Нет ошибок",
      continueText: "Продолжайте решать тесты и дальше повышайте свои знания!",
      totalMistakes: "Всего ошибок",
      differentTemplates: "Различные шаблоны",
      explanation: "Объяснение",
      learningTips: "Советы по обучению",
      repeat: "Повторить",
      repeatDesc:
        "Повторно изучите темы, в которых сделали ошибки, и повторите",
      deepLearning: "Глубокое изучение",
      deepLearningDesc:
        "Получите дополнительную информацию по темам с неправильными ответами",
      practice: "Практика",
      practiceDesc: "Решите больше подобных тестов",

      // Страница профиля
      specialist: "Специалист",
      skilled: "Квалифицированный",
      good: "Хороший",
      average: "Средний",
      beginner: "Новичок",
      registeredDate: "Зарегистрирован",
      unknownDate: "Неизвестно",
      overallSuccess: "Общий успех",
      correctPercentage: "Правильные ответы",
      wrongPercentage: "Неправильные ответы",
      achievements: "Достижения",
      testEnthusiast: "Любитель тестов",
      testEnthusiastDesc: "Пройдите 10 тестов",
      teacher: "Учитель",
      teacherDesc: "80% успеха",
      knowledgeable: "Знающий",
      knowledgeableDesc: "50 правильных ответов",
      marathonRunner: "Марафонец",
      marathonRunnerDesc: "Пройдите 100 тестов",

      // Страницы авторизации
      welcomeToIntalim: "Вход в AvtoTest",
      welcomeDesc: "Добро пожаловать в систему тестов",
      enterPhone: "90 123 45 67",
      enterName: "Введите ваше имя",
      enterLastname: "Введите вашу фамилию",
      enterPassword: "Введите пароль",
      repeatPassword: "Повторите пароль",
      minChars: "Минимум 6 символов",
      accountExists: "У вас есть аккаунт?",
      noAccount: "У вас нет аккаунта?",
      signUp: "Зарегистрироваться",
      signIn: "Вход",
      createAccount: "Создать аккаунт",
      createAccountDesc: "Создайте новый аккаунт и начните тесты",
      quickStart: "Быстрый старт",
      secure: "Безопасно",
      progress: "Прогресс",
      questions: "Вопросы",
      languages: "Языки",

      // Сообщения валидации
      phoneValidation: "Номер телефона должен состоять из 8 цифр",
      passwordValidation: "Пароль должен состоять минимум из 6 символов",
      nameValidation: "Введите имя и фамилию",
      passwordMismatch: "Пароли не совпадают",
      loginSuccess: "Вы успешно вошли!",
      registerSuccess: "Вы успешно зарегистрировались!",
      testFinished: "Тест успешно завершён!",
      selectAnswer: "Пожалуйста, выберите ответ",
      // Переводы для админ панели
      adminPanel: "Админ панель",
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

      // Сохранение теста
      testSession: "Сессия теста",
      resumeTest: "Продолжить тест",
      testProgress: "Прогресс теста",
      answeredQuestions: "Ответы на вопросы",
      completedQuestions: "Завершённые вопросы",
      finishTestPrompt: "Чтобы завершить тест, ответьте на все вопросы",

      // Улучшения входа
      clientLogin: "Вход как клиент",
      adminLogin: "Вход как админ",
      switchToClient: "Перейти в панель клиента",
      switchToAdmin: "Перейти в панель админа",
    },
  },
  uz_kiril: {
    translation: {
      upgradeProPlan: "ПРО га Ўтиш",
      signUpRegister: "Рўйхатдан Ўтиш",
      pricePerMonth: "сўм/ой",
      proFeatures: "ПРО План имкониятлари:",
      unlimitedTests: "Чексиз тестлар",
      allFeatures: "Барча функциялар",
      premiumSupport: "Премиум қўллаб-қувватлаш",
      validityPeriod: "ой амал қилиш муддати",
      payViaClick: "Click орқали тўлаш",
      payViaQR: "QR код орқали тўлаш",
      checkPaymentStatus: "Тўлов ҳолатини текшириш",
      activePlan: "Фаол План",
      choosePlan: "Тест Планларини Танланг",
      selectPlan: "Ўзингизга мос план танланг ва тест ечишни бошланг",
      forBeginners: "Бошланғич фойдаланувчилар учун",
      forProfessionals: "Профессионал фойдаланувчилар учун",
      popular: "Машҳур",
      testLimit: "та тест лимити",
      allLanguages: "Барча тиллар",
      errorAnalysis: "Хатолар таҳлили",
      statistics: "Статистика",
      examMode: "Имтиҳон режими",
      detailedAnalysis: "Батафсил таҳлил",
      planFeatures: "План имкониятлари",
      monthlyValidity: "ой амал қилиш муддати",
      paymentHistory: "Тўловлар тарихи",
      totalPayments: "Жами тўловлар",
      paymentCount: "Тўловлар сони",
      noPaymentsFound: "Ҳеч қандай тўлов топилмади",
      paymentSuccessful: "Тўлов муваффақиятли амалга оширилди!",
      paymentFailed: "Тўлов амалга оширилмади",
      loading: "Юкланмоқда...",
      cancel: "Бекор қилиш",
      confirm: "Тасдиқлаш",
      freePlan: "БЕПУЛ План",
      proPlan: "ПРО План",
      testLimitToday: "Бугунги тест лимити",
      invalidLanguage: "Нотўғри тил танланди",
      invalidQuestionCount: "Тест сони 20 ёки 50 бўлиши керак",
      noTemplatesFound: "Ушбу тилда шаблонлар топилмади",
      insufficientQuestions: "Ушбу тилда фақат {{count}} та савол мавжуд",
      examNotFound: "Имтиҳон топилмади",
      examExpired: "Имтиҳон тугаган ёки муддати ўтган",
      invalidQuestionIndex: "Нотўғри савол рақами",
      questionAlreadyAnswered: "Бу саволга аллақачон жавоб берилган",
      questionNotFound: "Савол топилмади",
      examAlreadyCompleted: "Имтиҳон аллақачон якунланган",
      paymentStatus: {
        paid: "Тўланган",
        pending: "Кутилмоқда",
        failed: "Муваффақиятсиз",
      },
      backToHome: "Бош саҳифага қайтиш",
      usedTests: "Ишлатилган тестлар",
      quickStart: "Тез бошлаш",
      quickStartDesc:
        "Дарҳол тест ечишни бошланг ва билимларингизни синаб кўринг",
      securePayment: "Хавфсиз тўлов",
      securePaymentDesc:
        "Тўловларингиз хавфсиз ва шифрланган усулда амалга оширилади",
      progressTracking: "Тараққиёт куза туви",
      progressTrackingDesc:
        "Ўз ривожланишингизни реал вақт режмида куза tib boring",
      currentPlan: "Жорий режа",
      expiryDate: "Муддати тугаш санаси",
      plansComparison: "Ре жаларни таққослаш",
      features: "Хусусиятлар",
      // Navigation
      home: "Бош саҳифа",
      templates: "Шаблонлар",
      mistakes: "Хатолар",
      profile: "Профил",
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

      // Хатолар саҳифаси учун
      noMistakesYet: "Ҳозирча ҳеч қандай хато йўқ",
      keepItUp: "Давом этинг!",
      analyzeMistakes:
        "Ўз хатоларингизни таҳлил қилинг ва билимларингизни оширинг",

      // Загрузка оптимизацияси учун
      loadingTemplates: "Шаблонлар юкланмоқда...",
      templatesLoaded: "Шаблонлар юкланди",

      // Профил саҳифаси янги yutuqlar
      testEnthusiast: "Тест ишқибози",
      testEnthusiastDesc: "10 та тест ишлаб чиқинг",
      teacher: "Ўқитувчи",
      teacherDesc: "80% муваффақият даражасига еришинг",
      knowledgeable: "Билимдон",
      knowledgeableDesc: "50 та тўғри жавоб беринг",
      marathonRunner: "Марафон югурувчиси",
      marathonRunnerDesc: "100 та тест бажар инг",

      // Umumiy
      excellent: "Ажойиб!",
      noMistakes: "Сизда ҳеч қандай хато йўқ!",
      continueText: "Давом этинг ва кўпроқ тест бажар инг!",
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
      startTest: "Тестни Бошланг",

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

      // Additional texts for Home page
      testDescription: "Тест шаблонларини кўриш ва тест ечишни бошлаш",
      mistakesDescription: "Қилган хатоларингизни кўриш ва таҳлил қилиш",
      profileDescription: "Шахсий маълумотлар ва статистикаларни кўриш",
      personalInfo: "Шахсий маълумотлар ва тест натижалари статистикаси",
      featuredTitle1: "Мақсадли Таълим",
      featuredDesc1:
        "Ҳар бир тест сизнинг билим даражангизни ошириш учун мўлжалланган",
      featuredTitle2: "Тараққиёт Куза туви",
      featuredDesc2:
        "Статистикалар орқали ўз ривожланишингизни куза tib boring",
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
        "Ҳар бир тест шаблони турли мавзулар бўйича саволларни ўз ичига олади. Тест жараёнида ҳар бир саволга жавоб беришингиз керак. Нотўғри жавоб берганда, тўғри жавоб кўрсатилади ва бу сизнинг хатолар бўлимига сақланади.",
      easyStart: "Осон Бошлаш",
      easyStartDesc: "Шаблонни танланг ва дарҳол тест ечишни бошланг",
      variousTopics: "Турли Мавзулар",
      variousTopicsDesc: "Ҳар хил соҳалар бўйича кенг қамровли тест саволлари",
      multiLanguage: "Кўп Тиллар",
      multiLanguageDesc: "Ўzbek, rus ва бошқа тилларда тест топшириш имконияти",

      // Test page
      questionLabel: "Савол:",
      confirmAnswer: "Жавобни Тасдиқлаш",

      // Mistakes page
      analyzeMistakes:
        "Қилган хатоларингизни таҳлил қилинг ва билимларингизни мустаҳкамланг",
      excellent: "Ажойиб! Ҳеч қандай хато йўқ",
      continueText:
        "Тестларни ечишда давом этинг ва ўз билимларингизни янада оширинг!",
      totalMistakes: "Жами хатолар",
      differentTemplates: "Турли шаблонлар",
      explanation: "Тушунтириш",
      learningTips: "Ўрган иш бўйича маслаҳатлар",
      repeat: "Такрорланг",
      repeatDesc: "Хато қилган мавзуларни қайта ўрганг ва такрорланг",
      deepLearning: "Чуқур ўрганг",
      deepLearningDesc:
        "Нотўғри жавоб берган мавзулар бўйича қўшимча маълумот олинг",
      practice: "Амалиёт қилинг",
      practiceDesc: "Ўхшаш тестларни кўпроқ ечиб кўринг",

      // Profile page
      specialist: "Мутахассис",
      skilled: "Мала kali",
      good: "Яхши",
      average: "Ўртача",
      beginner: "Янги бошловчи",
      registeredDate: "Рўйхатдан ўтган",
      unknownDate: "Маълум эмас",
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
      marathonRunner: "Маратон Ўтказувчи",
      marathonRunnerDesc: "100 та тест ечинг",

      // Auth pages
      welcomeToIntalim: " AvtoTest    га кириш",
      welcomeDesc: "Тест тизимига хуш келибсиз",
      enterPhone: "90 123 45 67",
      enterName: "Исмингизни киритинг",
      enterLastname: "Фамилиянгизни киритинг",
      enterPassword: "Паролингизни киритинг",
      repeatPassword: "Паролни такрорланг",
      minChars: "Камида 6 та белги",
      accountExists: "Ҳисобингиз борми?",
      noAccount: "Ҳисобингиз йўқми?",
      signUp: "Рўйхатдан ўтинг",
      signIn: "Кириш",
      createAccount: "Ҳисоб яратиш",
      createAccountDesc: "Янги ҳисоб яратинг ва тестларни бошланг",
      quickStart: "Тез Бошлаш",
      secure: "Хавфсиз",
      progress: "Тараққиёт",
      questions: "Саволлар",
      languages: "Тиллар",

      // Validation messages
      phoneValidation: "Телефон рақами 8 та рақамдан иборат бўлиши керак",
      passwordValidation: "Парол камида 6 та белгидан иборат бўлиши керак",
      nameValidation: "Исм ва фамилия киритилиши керак",
      passwordMismatch: "Пароллар мос келмайди",
      loginSuccess: "Муваффақиятли кирдингиз!",
      registerSuccess: "Муваффақиятли рўйхатдан ўтдингиз!",
      testFinished: "Тест муваффақиятли якунланди!",
      selectAnswer: "Илтимос, жавобни танланг",
      // Admin panel translations
      adminPanel: "Админ панели",
      systemManagement: "Тизим бошқаруви",
      dashboard: "Бошқарув панели",
      students: "Талабалар",
      payments: "Тўловлар",
      analytics: "Таҳлил",
      totalUsers: "Жами фойдаланувчилар",
      proUsers: "ПРО фойдаланувчилар",
      todayRevenue: "Бугунги даромад",
      monthlyRevenue: "Ойлик даромад",
      topUsers: "Топ фойдаланувчилар",
      recentPayments: "Сўнгги тўловлар",
      userDetails: "Фойдаланувчи маълумотлари",
      overview: "Умумий кўриниш",
      testActivity: "Тест фаоллиги",
      paymentHistory: "Тўловлар тарихи",
      mistakesHistory: "Хатолар тарихи",

      // Test persistence
      testSession: "Тест сессияси",
      resumeTest: "Тестни давом эттириш",
      testProgress: "Тест жараёни",
      answeredQuestions: "Жавоб берилган саволлар",
      completedQuestions: "Якунланган саволлар",
      finishTestPrompt: "Тестни якунлаш учун барча саволларга жавоб беринг",

      // Login improvements
      clientLogin: "Мижоз сифатида кириш",
      adminLogin: "Админ сифатида кириш",
      switchToClient: "Мижоз панелига ўтиш",
      switchToAdmin: "Админ панелига ўтиш",
    },
  },
  kaa: {
    translation: {
      upgradeProPlan: "PRO ga ótiw",
      signUpRegister: "Dizimnen ótiw",
      pricePerMonth: "som/ay",
      proFeatures: "PRO Plan imkoniyatlari:",
      unlimitedTests: "Sheksiz testler",
      allFeatures: "Barlıq funksiyalar",
      premiumSupport: "Premium qollab-quvvatlash",
      validityPeriod: "ay amal qilish muddati",
      payViaClick: "Click arqalı tólew",
      payViaQR: "QR kod arqalı tólew",
      checkPaymentStatus: "Tólew xalatın tekshiriw",
      activePlan: "Faol Plan",
      choosePlan: "Test Planların Tanlañ",
      selectPlan: "Óziñizge mos plan tanlañ hám test sheshiwdi baslañ",
      forBeginners: "Baslanǵısh paydalanıwshılar ushın",
      forProfessionals: "Professional paydalanıwshılar ushın",
      popular: "Mashhur",
      testLimit: "ta test limiti",
      allLanguages: "Barlıq tiller",
      errorAnalysis: "Qátelikler tahlili",
      statistics: "Statistika",
      examMode: "Imtihan rejimi",
      detailedAnalysis: "Batafsil tahlil",
      planFeatures: "Plan imkoniyatlari",
      monthlyValidity: "ay amal qilish muddati",
      paymentHistory: "Tólewler tarihi",
      totalPayments: "Jami tólewler",
      paymentCount: "Tólewler sani",
      noPaymentsFound: "Hesh qanday tólew tabılmadi",
      paymentSuccessful: "Tólew muwappaqiyatlı amalga ashırıldı!",
      paymentFailed: "Tólew amalga ashırılmadi",
      loading: "Yuklanıwda...",
      cancel: "Bekor qılıw",
      confirm: "Tastıyıqlaw",
      freePlan: "BEPUL Plan",
      proPlan: "PRO Plan",
      testLimitToday: "Búgingi test limiti",
      invalidLanguage: "Naduris til tallandı",
      invalidQuestionCount: "Test sani 20 yamasa 50 bolıwı kerek",
      noTemplatesFound: "Usı tilda shablonlar tabılmadi",
      insufficientQuestions: "Usı tilda paqat {{count}} ta soraw mawjud",
      examNotFound: "Imtihan tabılmadi",
      examExpired: "Imtihan tuǵagan yamasa muddati ótken",
      invalidQuestionIndex: "Naduris soraw nomeri",
      questionAlreadyAnswered: "Bul sorawǵa allaqashan juwap berilgen",
      questionNotFound: "Soraw tabılmadi",
      examAlreadyCompleted: "Imtihan allaqashan yakunlanǵan",
      paymentStatus: {
        paid: "Tólen gen",
        pending: "Kutılmaqta",
        failed: "Muwappaqiyatsız",
      },
      backToHome: "Bas sahifağa qaytıw",
      usedTests: "Paydalanıw testler",
      quickStart: "Tez baslaw",
      quickStartDesc:
        "Daxal test sheshiwdi baslañ hám bilimleriñizdi sinap köriñ",
      securePayment: "Qawipsiz tólew",
      securePaymentDesc:
        "Tólewleriñiz qawipsiz hám shifrlen gen usılda amalga ashırıladı",
      progressTracking: "Taraqqiyat kuzatıwı",
      progressTrackingDesc:
        "Óz riwajlanıwıñızdı real waqt rejiminde kuzatıp bariñ",
      currentPlan: "Aǵımdağı plan",
      expiryDate: "Móddeti tuǵaw sanası",
      plansComparison: "Planlardı taqqoslaw",
      features: "Xususiyatlar",
      // Navigation
      home: "Bas sahifa",
      templates: "Shablonlar",
      mistakes: "Qátelikler",
      profile: "Profil",
      testFailed: "Test muwappaqiyatsız tuǵadı",
      tooManyMistakes: "Siz 3 tadan artıq qátelek qıldıñız. Test toxtatıldı.",
      finalResult: "Yakuniy natija",
      correctAnswers: "Dúris juwaplar",
      wrongAnswers: "Naduris juwaplar",
      totalAnswered: "Jami juwaplar",
      backToTemplates: "Shablonlarğa qaytıw",
      questionsNavigation: "Sorawlar nawigatsiyası",
      selectAnswer: "Juwapdı tanlañ",
      current: "Aǵımdağı",
      unanswered: "Juwapsız",

      // Qátelikler sahifası ushın
      noMistakesYet: "Ázirsha hesh qanday qátelek joq",
      keepItUp: "Dawam etiñ!",
      analyzeMistakes:
        "Óz qátelikleriñizdi tahlil qılıñ hám bilimleriñizdi oshiriñ",

      // Yuklaw optimizatsiyası ushın
      loadingTemplates: "Shablonlar yuklanıwda...",
      templatesLoaded: "Shablonlar yuklandı",

      // Profil sahifası jańa jetiskenlikler
      testEnthusiast: "Test ishqibozi",
      testEnthusiastDesc: "10 ta test islep shıqıñ",
      teacher: "O'qıtıwshı",
      teacherDesc: "80% muwappaqiyat darajasına erisiñ",
      knowledgeable: "Bilimdon",
      knowledgeableDesc: "50 ta dúris juwap beriñ",
      marathonRunner: "Marafon yúgiriwshisi",
      marathonRunnerDesc: "100 ta test bajar ıñ",

      // Umumiy
      excellent: "Ajoyib!",
      noMistakes: "Sizda hesh qanday qátelek joq!",
      continueText: "Dawam etiñ hám kóplew test bajar ıñ!",
      explanation: "Túsindiri w",
      piece: "ta",
      // Home Page
      welcome: " AvtoTest     Test Tizimine Xosh Kelipsiz",
      homeDescription: "Professional test sheshiw platforması",
      startTesting: "Testti Baslaw",
      viewTemplates: "Shablonlardı Kóriw",
      checkMistakes: "Qáteliklerdi Kóriw",
      viewProfile: "Profil di Kóriw",

      // Templates Page
      templatesTitle: "Test Shablonları",
      questionsCount: "ta soraw",
      startTest: "Testti Baslañ",

      // Test Page
      question: "Soraw",
      of: "dan",
      nextQuestion: "Keyingi Soraw",
      finishTest: "Testti Yakunlaw",
      correct: "Dúris!",
      incorrect: "Naduris!",
      correctAnswer: "Dúris juwap:",

      // Mistakes Page
      mistakesTitle: "Sizdiń Qátelikleriñiz",
      noMistakes: "Siz áli hesh qanday qátelek qılmaǵansıñız!",
      templateName: "Shablon atı",
      yourAnswer: "Sizdiń juwapıñız",
      rightAnswer: "Dúris juwap",
      date: "Sana",

      // Profile Page
      profileTitle: "Profil Ma'lumotları",
      firstName: "At",
      lastName: "Familiya",
      phone: "Telefon",
      statistics: "Statistika",
      totalTests: "Jami testler",
      correctAnswers: "Dúris juwaplar",
      wrongAnswers: "Naduris juwaplar",
      successRate: "Muwappaqiyat foizi",

      // Auth
      login: "Kiriw",
      register: "Dizimnen ótiw",
      password: "Parol",
      confirmPassword: "Paroldı tastıyıqlaw",
      logout: "Shıqıw",

      // Common
      loading: "Yuklanıwda...",
      error: "Qátelek júz berdi",
      tryAgain: "Qayta urınıw",
      back: "Artqa",
      submit: "Jiberiw",

      // Additional texts for Home page
      testDescription: "Test shablonların kóriw hám test sheshiwdi baslaw",
      mistakesDescription: "Jasalǵan qáteliklerdi kóriw hám tahlil qılıw",
      profileDescription: "Jeke ma'lumotlar hám statistikaların kóriw",
      personalInfo: "Jeke ma'lumotlar hám test natijaleri statistikası",
      featuredTitle1: "Maqsetli Ta'lim",
      featuredDesc1:
        "Har bir test sizdiń bilim darajañızdı oshiriw ushın moljallangan",
      featuredTitle2: "Taraqqiyot Kuzatuvı",
      featuredDesc2: "Statistikalar arqalı óz riwajlanıwıñızdı kuzatıp bariñ",
      featuredTitle3: "Keń Qamrawlı",
      featuredDesc3: "Túrli mawzular boyınsha mıńlab sorawlar bazası",
      viewMore: "Kóplew",
      testQuestions: "Test sorawları",
      languageVariants: "Til variantları",
      availability: "Qoljetimdilik",

      // Templates page
      chooseTemplate:
        "Óziñizge tuwra kelgen test shablonın tallası hám bilimleriñizdi sinap kóriñ",
      noTemplatesFound: "Shablonlar tabılmadi",
      noTemplatesDesc: "Tallanǵan tilda test shablonları joq",
      template: "Shablon",
      piece: "ta",
      questionCount2: "Soraw sani:",
      language: "Til:",
      testInfo: "Test haqqında ma'lumot",
      testInfoDesc:
        "Har bir test shabloni túrli mawzular boyınsha sorawlardı óz ishine aladı. Test jarayonında har bir sorawǵa juwap beri w kerek. Naduris juwap bergende, dúris juwap kórsetiledi hám bul qátelikler bólimine saqlanadı.",
      easyStart: "Jesil Baslaw",
      easyStartDesc: "Shablonın tallası hám darxal test sheshiwdi baslası",
      variousTopics: "Túrli Mawzular",
      variousTopicsDesc:
        "Har túrli salalar boyınsha keń qamrawlı test sorawları",
      multiLanguage: "Kóp Tiller",
      multiLanguageDesc:
        "Qaraqalpaq, ózbek, rus hám basqa tillerde test tapsırıw múmkinshiligi",

      // Test page
      questionLabel: "Soraw:",
      confirmAnswer: "Juwapdı Tastıyıqlaw",

      // Mistakes page
      analyzeMistakes:
        "Jasalǵan qátelikleriñizdi tahlil qılıñ hám bilimleriñizdi mustahkamlañ",
      excellent: "Ajoyip! Hesh qanday qátelek joq",
      continueText:
        "Testlerdi sheshiwde dawam etiñ hám óz bilimleriñizdi jaqsı lap bariñ!",
      totalMistakes: "Barlıq qátelikler",
      differentTemplates: "Túrli shablonlar",
      explanation: "Túsindiri w",
      learningTips: "Órgeniw boyınsha keńesler",
      repeat: "Qaytalañ",
      repeatDesc: "Qátelek jasalǵan mawzulardı qayta órgeniñ hám qaytalañ",
      deepLearning: "Tereń órgeniw",
      deepLearningDesc:
        "Naduris juwap bergen mawzular boyınsha qosımsha ma'lumot alıñ",
      practice: "Ámeliyat qılıñ",
      practiceDesc: "Usı sıyaqlı testlerdi kóplew sheship kóriñ",

      // Profile page
      specialist: "Mutaxassis",
      skilled: "Bilimli",
      good: "Jaqsı",
      average: "Ortasha",
      beginner: "Jańa baslawshı",
      registeredDate: "Dizimnen ótken",
      unknownDate: "Belgisiz",
      overallSuccess: "Umumiy tabıslılıq",
      correctPercentage: "Dúris juwaplar",
      wrongPercentage: "Naduris juwaplar",
      achievements: "Jetiskenlikler",
      testEnthusiast: "Test Suyiwshi",
      testEnthusiastDesc: "10 ta test sheshiñ",
      teacher: "Muǵallim",
      teacherDesc: "80% tabıslılıq",
      knowledgeable: "Bilimli",
      knowledgeableDesc: "50 ta dúris juwap",
      marathonRunner: "Marafon Ótkerewshi",
      marathonRunnerDesc: "100 ta test sheshiñ",

      // Auth pages
      welcomeToIntalim: " AvtoTest    ga kiriw",
      welcomeDesc: "Test sistemasına xosh kelipsiz",
      enterPhone: "90 123 45 67",
      enterName: "Atıñızdı kiritiñ",
      enterLastname: "Familiyañızdı kiritiñ",
      enterPassword: "Parolıñızdı kiritiñ",
      repeatPassword: "Paroldı qaytalañ",
      minChars: "Keminde 6 ta belgi",
      accountExists: "Xisabıñız barma?",
      noAccount: "Xisabıñız joqpa?",
      signUp: "Dizimnen ótiñ",
      signIn: "Kiriw",
      createAccount: "Xisab jaratıñ",
      createAccountDesc: "Jańa xisab jaratıñ hám testlerdi baslası",
      quickStart: "Tez Baslaw",
      secure: "Qawipsiz",
      progress: "Taraqqiyat",
      questions: "Sorawlar",
      languages: "Tiller",

      // Validation messages
      phoneValidation: "Telefon nomeri 8 ta sannan ibarat bolıwı kerek",
      passwordValidation: "Parol keminde 6 ta belgenden ibarat bolıwı kerek",
      nameValidation: "At hám familiya kiritiñ",
      passwordMismatch: "Paroller sáy kes kelmedi",
      loginSuccess: "Tabıslı kirdiñiz!",
      registerSuccess: "Tabıslı dizimnen óttiñiz!",
      testFinished: "Test tabıslı tamamlandı!",
      selectAnswer: "Juwapdı tallasıñızdı ótin etemiz",
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
      completedQuestions: "Tamamlanǵan sorawlar",
      finishTestPrompt: "Testni tamamlaw úshin barlıq sorawlarǵa juwap beriň",

      // Login improvements
      clientLogin: "Mijoz sıpatında kiriw",
      adminLogin: "Admin sıpatında kiriw",
      switchToClient: "Mijoz paneliga ótiw",
      switchToAdmin: "Admin paneliga ótiw",
    },
  },
  kaa_kiril: {
    translation: {
      upgradeProPlan: "ПРО га ѳтиў",
      signUpRegister: "Дизимнен ѳтиў",
      pricePerMonth: "сом/ай",
      proFeatures: "ПРО План имкониятлары:",
      unlimitedTests: "Шексиз тестлер",
      allFeatures: "Барлық функциялар",
      premiumSupport: "Премиум қоллаб-қувватлаш",
      validityPeriod: "ай амал қылыў муддаты",
      payViaClick: "Click арқалы тѳлеў",
      payViaQR: "QR код арқалы тѳлеў",
      checkPaymentStatus: "Тѳлеў халатын текшириў",
      activePlan: "Фаол План",
      choosePlan: "Тест Планларын Танлаң",
      selectPlan: "Ѳзиңизге мос план танлаң ҳәм тест шешиўди баслаң",
      forBeginners: "Басланғы ш пайдаланыўшылар ушын",
      forProfessionals: "Профессионал пайдаланыўшылар ушын",
      popular: "Машҳур",
      testLimit: "та тест лимиты",
      allLanguages: "Барлық тиллер",
      errorAnalysis: "Қәтеликлер таҳлилы",
      statistics: "Статистика",
      examMode: "Имтихан режими",
      detailedAnalysis: "Батафсил таҳлил",
      planFeatures: "План имкониятлары",
      monthlyValidity: "ай амал қылыў муддаты",
      paymentHistory: "Тѳлеўлер тарихи",
      totalPayments: "Жами тѳлеўлер",
      paymentCount: "Тѳлеўлер саны",
      noPaymentsFound: "Ҳеш қандай тѳлеў табылмады",
      paymentSuccessful: "Тѳлеў муўаппақиятлы амалға ашырылды!",
      paymentFailed: "Тѳлеў амалға ашырылмады",
      loading: "Юкланыўда...",
      cancel: "Бекор қылыў",
      confirm: "Тасдиқлаў",
      freePlan: "БЕПУЛ План",
      proPlan: "ПРО План",
      testLimitToday: "Бүгинги тест лимиты",
      invalidLanguage: "Надурыс тил талланды",
      invalidQuestionCount: "Тест саны 20 ямаса 50 болыўы керек",
      noTemplatesFound: "Усы тилда шаблонлар табылмады",
      insufficientQuestions: "Усы тилда пақат {{count}} та сораў маўжуд",
      examNotFound: "Имтихан табылмады",
      examExpired: "Имтихан туғаган ямаса муддаты ѳткен",
      invalidQuestionIndex: "Надурыс сораў номеры",
      questionAlreadyAnswered: "Бул сораўға аллақашан жуўап берилген",
      questionNotFound: "Сораў табылмады",
      examAlreadyCompleted: "Имтихан аллақашан якунланған",
      paymentStatus: {
        paid: "Тѳлен ген",
        pending: "Кутылмақта",
        failed: "Муўаппақиятсыз",
      },
      backToHome: "Бас саҳифаға қайтыў",
      usedTests: "Пайдаланыў тестлер",
      quickStart: "Тез баслаў",
      quickStartDesc:
        "Дахал тест шешиўди баслаң ҳәм билимлериңизди си нап кѳриң",
      securePayment: "Қауипсиз тѳлеў",
      securePaymentDesc:
        "Тѳлеўлериңиз қауипсиз ҳәм шифрлен ген усылда амалға ашырылады",
      progressTracking: "Тараққият куза тывы",
      progressTrackingDesc:
        "Ѳз риважланыўыңызды реал ўақыт реж имиңде куза тып барың",
      currentPlan: "Ағымдағы план",
      expiryDate: "Мѳддети туғаў санасы",
      plansComparison: "Планларды таққослаў",
      features: "Хусусиятлар",
      // Navigation
      home: "Бас саҳифа",
      templates: "Шаблонлар",
      mistakes: "Қәтеликлер",
      profile: "Профил",
      testFailed: "Тест муўаппақиятсыз туғады",
      tooManyMistakes: "Сиз 3 тадан артық қәтелик қылдыңыз. Тест тохтатылды.",
      finalResult: "Якуний натижа",
      correctAnswers: "Дүрис жуўаплар",
      wrongAnswers: "Надурыс жуўаплар",
      totalAnswered: "Жами жуўаплар",
      backToTemplates: "Шаблонларға қайтыў",
      questionsNavigation: "Сораўлар навигациясы",
      selectAnswer: "Жуўапды танлаң",
      current: "Ағымдағы",
      unanswered: "Жуўапсыз",

      // Қәтеликлер саҳифасы ушын
      noMistakesYet: "Әзирша ҳеш қандай қәтелик жоқ",
      keepItUp: "Даўам етиң!",
      analyzeMistakes:
        "Ѳз қәтеликлериңизди таҳлил қылың ҳәм билимлериңизди ошырың",

      // Юклаў оптимизациясы ушын
      loadingTemplates: "Шаблонлар юкланыўда...",
      templatesLoaded: "Шаблонлар юкланды",

      // Профил саҳифасы жаңа жетискенликлер
      testEnthusiast: "Тест ишқибозы",
      testEnthusiastDesc: "10 та тест ислер шықың",
      teacher: "О'қытыўшы",
      teacherDesc: "80% муўаппақият даражасына ерисиң",
      knowledgeable: "Билимдон",
      knowledgeableDesc: "50 та дүрис жуўап бериң",
      marathonRunner: "Марафон югырыўшысы",
      marathonRunnerDesc: "100 та тест бажар ың",

      // Umumiy
      excellent: "Ажойиб!",
      noMistakes: "Сизда ҳеш қандай қәтелик жоқ!",
      continueText: "Даўам етиң ҳәм кѳплеў тест бажар ың!",
      explanation: "Түсиндириў",
      piece: "та",
      // Home Page
      welcome: " AvtoTest     Тест Тизимине Хош Келипсиз",
      homeDescription: "Профессионал тест шешиў платформасы",
      startTesting: "Тестти Баслаў",
      viewTemplates: "Шаблонларды Кѳриў",
      checkMistakes: "Қәтеликлерди Кѳриў",
      viewProfile: "Профил ди Кѳриў",

      // Templates Page
      templatesTitle: "Тест Шаблонлары",
      questionsCount: "та сораў",
      startTest: "Тестти Баслаң",

      // Test Page
      question: "Сораў",
      of: "дан",
      nextQuestion: "Кейинги Сораў",
      finishTest: "Тестти Якунлаў",
      correct: "Дүрис!",
      incorrect: "Надурыс!",
      correctAnswer: "Дүрис жуўап:",

      // Mistakes Page
      mistakesTitle: "Сиздиң Қәтеликлериңиз",
      noMistakes: "Сиз әли ҳеш қандай қәтелик қылмағансыңыз!",
      templateName: "Шаблон аты",
      yourAnswer: "Сиздиң жуўапыңыз",
      rightAnswer: "Дүрис жуўап",
      date: "Сана",

      // Profile Page
      profileTitle: "Профил Маълу мотлары",
      firstName: "Ат",
      lastName: "Фамилия",
      phone: "Телефон",
      statistics: "Статистика",
      totalTests: "Жами тестлер",
      correctAnswers: "Дүрис жуўаплар",
      wrongAnswers: "Надурыс жуўаплар",
      successRate: "Муўаппақият фоизы",

      // Auth
      login: "Кириў",
      register: "Дизимнен ѳтиў",
      password: "Парол",
      confirmPassword: "Паролды тасдиқлаў",
      logout: "Шықыў",

      // Common
      loading: "Юкланыўда...",
      error: "Қәтелик жүз берди",
      tryAgain: "Қайта урыныў",
      back: "Артқа",
      submit: "Жибериў",

      // Additional texts for Home page
      testDescription: "Тест шаблонларын кѳриў ҳәм тест шешиўди баслаў",
      mistakesDescription: "Жасалған қәтеликлерди кѳриў ҳәм таҳлил қылыў",
      profileDescription: "Жеке маълу мотлар ҳәм статистикаларын кѳриў",
      personalInfo: "Жеке маълу мотлар ҳәм тест натижалари статистикасы",
      featuredTitle1: "Мақсетли Таълим",
      featuredDesc1:
        "Ҳәр бир тест сиздиң билим даражаңызды ошырыў ушын мѳлжалланған",
      featuredTitle2: "Тараққият Куза тывы",
      featuredDesc2: "Статистикалар арқалы ѳз риважланыўыңызды куза тып барың",
      featuredTitle3: "Кең Қамраўлы",
      featuredDesc3: "Түрли маўзулар бойынша мыңлаб сораўлар базасы",
      viewMore: "Кѳпрек",
      testQuestions: "Тест сораўлары",
      languageVariants: "Тил вариантлары",
      availability: "Қолжетимдилик",

      // Templates page
      chooseTemplate:
        "Ѳзиңизге туўра келген тест шаблонын талласы ҳәм билимлериңизди сынап кѳриң",
      noTemplatesFound: "Шаблонлар табылмады",
      noTemplatesDesc: "Талланған тилде тест шаблонлары жоқ",
      template: "Шаблон",
      piece: "та",
      questionCount2: "Сораў саны:",
      language: "Тил:",
      testInfo: "Тест хаққында мәлу мат",
      testInfoDesc:
        "Ҳәр бир тест шаблоны түрли маўзулар бойынша сораўкарды ѳз ишиге алады. Тест жарайонында ҳәр бир сораўға жуўап бериў керек. Надурыс жуўап бергенде, дурыс жуўап кѳрсетиледи ҳәм бул қәтеликлер бѳлимине сақланады.",
      easyStart: "Жеңил Баслаў",
      easyStartDesc: "Шаблонын талласы ҳәм дархал тест шешиўди басласы",
      variousTopics: "Түрли Маўзулар",
      variousTopicsDesc:
        "Ҳәр түрли салалар бойынша кең қамраўлы тест сораўлары",
      multiLanguage: "Кѳп Тиллер",
      multiLanguageDesc:
        "Қарақалпақ, ѳzbekше, русша ҳәм басқа тилларде тест тапсырыў мүмкиншилик",

      // Test page
      questionLabel: "Сораў:",
      confirmAnswer: "Жуўапты Тасдиқлаў",

      // Mistakes page
      analyzeMistakes:
        "Жасалған қәтеликларинди таҳлил қылың ҳәм билимлариңди мустахкемлең",
      excellent: "Ажойып! Хеш қандай қәтелик жоқ",
      continueText:
        "Тестларди шешиўде даўам етиң ҳәм ѳз билимлариңди жақсылап барың!",
      totalMistakes: "Барлық қәтеликлер",
      differentTemplates: "Түрли шаблонлар",
      explanation: "Түсиндириў",
      learningTips: "Үйрениў бойынша кеңеслер",
      repeat: "Қайталаң",
      repeatDesc: "Қәтелик жасалған маўзуларды қайта үйрениң ҳәм қайталаң",
      deepLearning: "Терең үйрениў",
      deepLearningDesc:
        "Надурыс жуўап берген маўзулар бойынша қосымша мәлу мат алың",
      practice: "Әмелият қылың",
      practiceDesc: "Усы сыяқлы тестларды кѳпрек шешип кѳриң",

      // Profile page
      specialist: "Мутахассис",
      skilled: "Билимли",
      good: "Жақсы",
      average: "Орташа",
      beginner: "Жаңа баслаўшы",
      registeredDate: "Дизимнен ѳткен",
      unknownDate: "Белгисиз",
      overallSuccess: "Умумий табыслылық",
      correctPercentage: "Дурыс жуўаплар",
      wrongPercentage: "Надурыс жуўаплар",
      achievements: "Жетискенликлер",
      testEnthusiast: "Тест Суйиўши",
      testEnthusiastDesc: "10 та тест шешиң",
      teacher: "Муғаллим",
      teacherDesc: "80% табыслылық",
      knowledgeable: "Билимли",
      knowledgeableDesc: "50 та дурыс жуўап",
      marathonRunner: "Марафон Ѳткериўши",
      marathonRunnerDesc: "100 та тест шешиң",

      // Auth pages
      welcomeToIntalim: " AvtoTest    га кириў",
      welcomeDesc: "Тест системасына хош келипсиз",
      enterPhone: "90 123 45 67",
      enterName: "Атыңызды киритиң",
      enterLastname: "Фамилияңызды киритиң",
      enterPassword: "Паролыңызды киритиң",
      repeatPassword: "Паролды қайталаң",
      minChars: "Кеминде 6 та белги",
      accountExists: "Хисабыңыз барма?",
      noAccount: "Хисабыңыз жоқпа?",
      signUp: "Дизимнен ѳтиң",
      signIn: "Кириў",
      createAccount: "Хисаб жаратың",
      createAccountDesc: "Жаңа хисаб жаратың ҳәм тестларды басласы",
      quickStart: "Тез Баслаў",
      secure: "Қәўипсиз",
      progress: "Тараққият",
      questions: "Сораўлар",
      languages: "Тиллер",

      // Validation messages
      phoneValidation: "Телефон нѳмери 8 та саннан ибарат болыўы керек",
      passwordValidation: "Парол кеминде 6 та белгиден ибарат болыўы керек",
      nameValidation: "Ат ҳәм фамилия киритиң",
      passwordMismatch: "Пароллер сәйкес келмейди",
      loginSuccess: "Табыслы кирдиңиз!",
      registerSuccess: "Табыслы дизимнен ѳттиңиз!",
      testFinished: "Тест табыслы тамамланды!",
      selectAnswer: "Жуўапды талласыңызды ѳтин етемиз",
      // Admin panel translations
      adminPanel: "Админ панел",
      systemManagement: "Система басқарыўы",
      dashboard: "Басқарыў панели",
      students: "Студентлер",
      payments: "Тѳлеўлер",
      analytics: "Таҳлил",
      totalUsers: "Барлық пайдаланыўшылар",
      proUsers: "ПРО пайдаланыўшылар",
      todayRevenue: "Бүгинги кириў",
      monthlyRevenue: "Айлық кириў",
      topUsers: "Топ пайдаланыўшылар",
      recentPayments: "Соң тѳлеўлер",
      userDetails: "Пайдаланыўшы ақпаны",
      overview: "Умумий кѳриў",
      testActivity: "Тест актиўлиги",
      paymentHistory: "Тѳлеўлер тарихи",
      mistakesHistory: "Қәтеликлер тарихи",

      // Test persistence
      testSession: "Тест сессиясы",
      resumeTest: "Тестни даўам еттириў",
      testProgress: "Тест бараўы",
      answeredQuestions: "Жуўап берилген сораўлар",
      completedQuestions: "Тамамланған сораўлар",
      finishTestPrompt: "Тестни тамамлаў үшин барлық сораўларға жуўап бериң",

      // Login improvements
      clientLogin: "Мижоз сыпатыңда кириў",
      adminLogin: "Админ сыпатыңда кириў",
      switchToClient: "Мижоз панелига ѳтиў",
      switchToAdmin: "Админ панелига ѳтиў",
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
