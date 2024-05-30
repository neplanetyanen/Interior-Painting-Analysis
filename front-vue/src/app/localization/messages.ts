const messages = {
    en: {
        message: {
            signup: 'SIGN UP',
            signupBtn: 'SIGN UP',
            login: 'LOG IN',
            loginBtn: 'LOG IN',
            tryIt: 'TRY IT',
            footerCompleted:
                'Completed under the "Internet Technologies" subject program',
            footerCompanyName: '© 2024, IP "Kaban"',
            placeholderUsername: 'Username',
            placeholderPassword: 'Password',
            linkForgotUsernameOrPassword: 'Forgot Username/Password?',
            linkDontHhaveAnAccount: 'Don`t have an account? Sing Up',
            linkHaveAnAccount: 'Have an account? Log In',
            helloMsgStart: 'Hello, ',
            helloMsgEnd: '! Let`s get to start...',
            analyzeMenu: 'Analyze the interior',
            profileMenu: 'Profile',
            historyMenu: 'History',
            logoutMenu: 'Log Out',
            usernameAuth: 'Username',
            emailAuth: 'Email',
            passwordAuth: 'Password',
            repeatPasswordAuth: 'Repeat Password',
            instructionFileManagerStart: 'Drag and drop or ',
            instructionLinkFileManager: 'select an interior image file',
            instructionFileManagerEnd:
                ' in <strong>.png</strong>, <strong>.jpg</strong> or <strong>.jpeg</strong> format',
            dragAndDropMsg: 'Drag and drop the file here',
            errorFormatMsg:
                'ERROR: The file is not in the correct format. Available formats: .png, .jpg, .jpeg',
            errorFileMsg: 'ERROR: The file is corrupted. Select another file',
            carouselMsg: 'History of the analyzed interiors',
            sloganCompanyName: 'Interior Painting Analysis​',
            sloganSubArtMade:
                '​​Art made for your home: find your inspirational painting with us.',
            sloganReflectionOf: '​A reflection of your style',
            sloganSubGetUnique:
                'Get unique and matching paintings selected using a machine learning model. These paintings will perfectly complement your interior, creating an atmosphere perfectly suited to your taste and personality.',
            sloganMakeYourHome: 'Make your home exceptional',
            sloganWeBelieve:
                'We believe it would <br /><strong>save you time</strong>',
            sloganTheArtOfSmart:
                '​​The art of smart matching: your interior, our algorithms',
            sloganSubOurArt:
                'Our art recommendations are shaped by advanced machine learning algorithms that analyze your interior taking into account style, color scheme and overall atmosphere. Our learning model finds the perfect combination of paintings that harmonize with your space. Trust technology to create visual harmony in your home with our smart system of paintings selection!',
            usernameAlreadyExistsError:
                'Username already exists, please choose another username.',
            emailAlreadyExistsError: 'Email already exists, please login.',
            usernameNotFoundError: 'User not found, please register.',
            incorrectPasswordError: 'Incorrect password.',
            passwordsNotMatchError: 'Passwords don`t match.',
            invalidLengthUsernameError:
                'Login length is invalid. Length of login is from 5 to 30 symbols.',
            invalidLengthPasswordError:
                'Password length is invalid. Length of password is minimum 8 symbols.',
            regexpMismatchUsernameError:
                "Login format is invalid. Login can only consist of Latin letters, numbers and symbols: '.', '_', '-'",
            regexpMismatchPasswordError:
                "Password format is invalid. Password can only consist of Latin letters, numbers and symbols: '.', '@', '_', '-'",
            createPageInterior: 'Your interior:',
            createPageTopPaintings: 'Top 5 pictures:',
            noHistoryMsg:
                "There doesn't seem to be any interior images uploaded.",
            noHistoryLinkMsg:
                'Go to the creation page and discover the first pages of history in IPA!'
        }
    },
    ru: {
        message: {
            signup: 'РЕГИСТРАЦИЯ',
            signupBtn: 'Зарегистрироваться',
            login: 'ВХОД',
            loginBtn: 'Войти',
            tryIt: 'Попробовать',
            footerCompleted:
                'Выполнено по программе предмета "Интернет-технологии"',
            footerCompanyName: '© 2024, ИП "Кабан"',
            placeholderUsername: 'Имя пользователя',
            placeholderPassword: 'Пароль',
            linkForgotUsernameOrPassword: 'Забыли Имя пользователя/Пароль?',
            linkDontHhaveAnAccount: 'Нет аккаунта? Зарегистрируйтесь',
            linkHaveAnAccount: 'Есть аккаунт? Войдите',
            helloMsgStart: 'Здравствуйте, ',
            helloMsgEnd: '! Давайте начнем...',
            analyzeMenu: 'Анализ интерьера',
            profileMenu: 'Профиль',
            historyMenu: 'История',
            logoutMenu: 'Выйти',
            usernameAuth: 'Имя пользователя',
            emailAuth: 'Почта',
            passwordAuth: 'Пароль',
            repeatPasswordAuth: 'Повторите пароль',
            instructionFileManagerStart: 'Перетащите или ',
            instructionLinkFileManager: 'выберите файл',
            instructionFileManagerEnd:
                ' с изображением интерьера в форматах <strong>.png</strong>, <strong>.jpg</strong> или <strong>.jpeg</strong>',
            dragAndDropMsg: 'Перетащите файл сюда',
            errorFormatMsg:
                'ОШИБКА: Файл неверного формата. Доступные форматы: .png, .jpg, .jpeg',
            errorFileMsg: 'ОШИБКА: Файл поврежден. Выберите другой файл',
            carouselMsg: 'История загруженных интерьеров',
            sloganCompanyName: 'Интерьер. Картины. Анализ​',
            sloganSubArtMade:
                '​Искусство, созданное для вашего дома: найдите свою идеальную картину у нас.',
            sloganReflectionOf: 'Отражение вашего стиля',
            sloganSubGetUnique:
                'Получите уникальные и подходящие картины, подобранные с помощью модели машинного обучения. Эти картины идеально дополнят ваш интерьер, создавая атмосферу, полностью соответствующую вашему вкусу и индивидуальности.',
            sloganMakeYourHome: 'Сделайте свой дом особенным',
            sloganWeBelieve:
                'Мы уверены, это <br /><strong>сэкономит ваше время</strong>',
            sloganTheArtOfSmart:
                '​Искусство умного подбора: ваш интерьер, наши алгоритмы',
            sloganSubOurArt:
                'Наши рекомендации по выбору картин формируются с помощью передовых алгоритмов машинного обучения, которые анализируют ваш интерьер с учетом стиля, цветовой гаммы и общей атмосферы. Доверьте технологию создания визуальной гармонии в вашем доме нашей умной системе подбора картин!',
            usernameAlreadyExistsError: 'Данное имя пользователя уже занято',
            emailAlreadyExistsError: 'Почта уже существует',
            usernameNotFoundError: 'Пользователь не найден, зарегистрируйтесь',
            incorrectPasswordError: 'Неверный пароль',
            passwordsNotMatchError: 'Пароли не совпадают',
            invalidLengthUsernameError:
                'Длина имени пользователя должна быть от 5 до 30 символов.',
            invalidLengthPasswordError: 'Длина пароля не менее 8 символов',
            regexpMismatchUsernameError:
                "Имя пользователя может состоять только из латинских букв, цифр и символов: '.', '_', '-'",
            regexpMismatchPasswordError:
                "Пароль может состоять только из латинских букв, цифр и символов: '.', '@', '_', '-'",
            createPageInterior: 'Ваш интерьер:',
            createPageTopPaintings: 'Топ 5 картин:',
            noHistoryMsg:
                'Похоже нет ни одного загруженного изображения интерьера.',
            noHistoryLinkMsg:
                'Перейдите на страницу создания и откройте первые страницы истории в IPA!'
        }
    }
};

export { messages };
