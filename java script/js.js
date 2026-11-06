const menuButton = document.querySelector('.menu-btn');
const sidebar = document.querySelector('.sidebar');
const overlays = document.querySelectorAll('[data-close-menu]');
let refreshDynamicContent = () => {};
let refreshGoogleSignInButton = () => {};
let refreshEmailAuth = () => {};
let googleAuthEmail = '';
let googleAuthStatusKey = 'googleSignedOut';
const translations = {
    id: {
        homePageTitle: 'Tentang HK Squad',
        homePageDescription: 'Kenali HK Squad, komunitas esports dan gaming yang tumbuh bersama dengan solidaritas dan sportivitas.',
        memberPageTitle: 'Anggota HK Squad',
        memberPageDescription: 'Kenali anggota HK Squad dan kelola profil setiap anggota.',
        homeLinkLabel: 'HK Squad - Beranda',
        logoArtLabel: 'Logo HK Squad',
        logoImageAlt: 'Logo HK Squad dengan maskot serigala',
        navigationMenu: 'Menu',
        languageSelectLabel: 'Pilih bahasa',
        themeOptionsLabel: 'Pilih warna tema',
        themePurpleLabel: 'Ungu',
        themeBlueLabel: 'Biru',
        themeGreenLabel: 'Hijau',
        themeRedLabel: 'Merah',
        themeBlackLabel: 'Hitam',
        membersListLabel: 'Daftar 12 anggota HK Squad',
        closeDialogLabel: 'Tutup',
        memberPhotoPreview: 'Pratinjau foto anggota',
        menuTitle: 'MENU HK SQUAD',
        aboutLink: 'Tentang HK Squad',
        valuesLink: 'Nilai Kami',
        memberLink: 'Daftar Anggota',
        settingsTitle: 'Pengaturan',
        languageLabel: 'Bahasa',
        googleSignedOut: 'Belum login (opsional)',
        googleSignedInAs: 'Login sebagai',
        googleSignOut: 'Keluar',
        googleBackendMissing: 'URL backend belum dikonfigurasi untuk hosting GitHub Pages.',
        googleScriptFailed: 'Layanan Login Google tidak dapat dimuat.',
        googleAuthFailed: 'Login Google gagal. Silakan coba lagi.',
        googleAdminDenied: 'Akun Google ini bukan akun admin yang diizinkan.',
        googleAuthLocked: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.',
        googleLoginRequired: 'Login dengan akun Google admin melalui menu Pengaturan terlebih dahulu.',
        googleResetNotice: 'Login dengan akun Google admin sebelum mereset kata sandi.',
        emailAuthTitle: 'Akun pengunjung (opsional)',
        emailGoogleSignIn: 'Lanjutkan dengan Google',
        emailOr: 'atau gunakan email',
        emailLabel: 'Email',
        emailPasswordLabel: 'Kata sandi (minimal 6 karakter)',
        emailAuthReady: 'Masuk atau daftar dengan email. Login tidak wajib.',
        emailSignIn: 'Masuk',
        emailRegister: 'Daftar',
        emailReset: 'Lupa kata sandi?',
        emailSignOut: 'Keluar dari akun',
        emailFirebaseUnavailable: 'Layanan login email tidak dapat dimuat. Coba muat ulang halaman.',
        emailFirebaseNotConfigured: 'Konfigurasi Firebase belum ditemukan.',
        emailAuthRequiresWebOrigin: 'Halaman dibuka langsung dari file. Buka situs lewat localhost atau HTTPS agar login aktif.',
        emailAuthWorking: 'Memproses permintaan...',
        emailSignedInAs: 'Login sebagai',
        emailRegisterSuccess: 'Akun berhasil dibuat dan login.',
        emailResetSent: 'Email untuk mengatur ulang kata sandi telah dikirim.',
        emailInvalid: 'Masukkan alamat email yang valid.',
        emailWeakPassword: 'Kata sandi minimal 6 karakter.',
        emailAlreadyUsed: 'Email ini sudah terdaftar. Silakan masuk.',
        emailWrongCredentials: 'Email atau kata sandi salah.',
        emailTooManyRequests: 'Terlalu banyak percobaan. Coba lagi nanti.',
        emailSignInDisabled: 'Login email/password belum diaktifkan di Firebase.',
        emailNetworkError: 'Tidak dapat terhubung. Periksa koneksi internet.',
        emailAuthError: 'Login gagal. Periksa email dan kata sandi, lalu coba lagi.',
        emailGoogleNotEnabled: 'Login Google belum diaktifkan di Firebase.',
        emailGooglePopupBlocked: 'Popup Google diblokir browser. Izinkan popup lalu coba lagi.',
        emailGooglePopupClosed: 'Login Google dibatalkan.',
        emailGoogleDomainNotAllowed: 'Domain website belum diizinkan di Firebase Authentication.',
        emailGoogleAccountConflict: 'Email ini sudah memakai metode login lain. Masuk dengan email dan kata sandi terlebih dahulu.',
        colorLabel: 'Warna tema',
        heroEyebrow: 'KOMUNITAS ESPORTS & GAMING',
        heroTitle: 'Tentang',
        heroDescription: 'Bukan sekadar bermain bersama. Kami membangun tim yang solid, saling mendukung, dan terus berkembang di setiap pertandingan.',
        memberButton: 'Lihat Anggota Squad',
        heroNote: 'SOLIDARITAS · KERJA SAMA · SPORTIVITAS',
        artCaption: 'EST. HILANG KONEKSI',
        aboutEyebrow: 'SIAPA KAMI',
        aboutHeading: 'HK.squad',
        teamHeading: '(Hilang Koneksi)',
        aboutLead: 'Hilang Koneksi bukan sekadar nama, melainkan kisah perjuangan yang selalu kami kenang. Setiap kali bermain Mobile Legends bersama, koneksi internet sering menjadi tantangan terbesar. Saat berjuang meraih kemenangan, sinyal kerap menghilang dan permainan pun terputus. Namun, di tengah kesulitan itu, ada seorang teman yang selalu berusaha lebih keras—rela pergi ke Matang Liang demi mencari sinyal yang lebih baik agar bisa kembali bermain bersama tim. Perjalanan mencari koneksi ini menjadi simbol semangat, kesabaran, dan solidaritas dalam squad kami. Karena itulah kami memilih nama “Hilang Koneksi”. Nama ini mengingatkan kami bahwa meskipun sinyal dapat hilang, persahabatan, kerja sama, dan semangat bermain bersama tidak akan pernah terputus. Setiap lag, disconnect, dan usaha mencari sinyal menjadi bagian dari perjalanan yang membuat squad kami unik dan penuh cerita. “Sinyal boleh hilang, koneksi persahabatan tetap terhubung.”',
        aboutBody: 'Kami percaya setiap pemain bisa berkembang ketika punya lingkungan yang saling menyemangati. Menang dirayakan bersama, kalah jadi pelajaran untuk kembali lebih kuat.',
        valueSolidarity: 'Solidaritas',
        valueSolidarityBody: 'Saling mendukung dan menjaga kekompakan, di dalam maupun di luar permainan.',
        valueTeamwork: 'Kerja Sama',
        valueTeamworkBody: 'Berkomunikasi, menyusun strategi, dan mencapai tujuan sebagai satu tim.',
        valueFairPlay: 'Sportivitas',
        valueFairPlayBody: 'Menghormati lawan, menerima hasil, dan tetap bermain dengan sikap positif.',
        nextEyebrow: 'LANGKAH BERIKUTNYA',
        nextHeading: 'Siap jadi bagian dari',
        nextHighlight: 'perjalanan kami?',
        memberPrompt: 'Lihat dan kelola 12 slot anggota HK Squad.',
        memberPageLink: 'Buka halaman member',
        footerTagline: 'Solid bersama, berkembang bersama.',
        membersEyebrow: 'LIHAT KAMI',
        membersTitle: 'Anggota',
        membersDescription: 'Upload foto anda broo.',
        initialPasswordLabel: 'Kata sandi awal untuk semua slot',
        memberListTitle: 'Daftar Anggota',
        memberSlotCount: '12 SLOT ANGGOTA',
        backAbout: 'Kembali ke Tentang HK Squad',
        editMemberTitle: 'PENGATURAN ANGGOTA',
        manageMember: 'Kelola anggota',
        passwordLabel: 'Kata sandi anggota',
        forgotPasswordHint: 'Setelah 3 kali salah, login dengan Google admin dari menu Pengaturan untuk mereset kata sandi.',
        adminResetButton: 'Verifikasi Google & ubah kata sandi',
        googleAuthWrong: 'Akun Google tidak dapat diverifikasi.',
        adminResetLocked: 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.',
        adminResetFailed: 'Kata sandi tidak dapat diubah. Coba lagi.',
        serverUnavailable: 'Backend reset tidak dapat dihubungi. Periksa koneksi atau konfigurasi URL backend.',
        cancelButton: 'Batal',
        continueButton: 'Lanjutkan',
        memberNameLabel: 'Nama anggota',
        memberRoleLabel: 'Posisi / role',
        memberPhotoLabel: 'Foto profil (maks. 5 MB)',
        deletePhotoButton: 'Hapus foto',
        changePasswordTitle: 'Ganti kata sandi (opsional)',
        changePasswordHint: 'Kosongkan jika tidak ingin mengganti kata sandi.',
        newPasswordLabel: 'Kata sandi baru',
        confirmPasswordLabel: 'Konfirmasi kata sandi baru',
        saveChangesButton: 'Simpan perubahan',
        manageButton: 'Kelola anggota',
        memberRole: 'Member HK Squad',
        wrongPassword: 'Kata sandi salah. Coba lagi.',
        memberToast: 'Anggota Tim Dantar Siap Membasmi',
        passwordUnavailable: 'Tidak dapat memeriksa kata sandi di browser ini.',
        invalidImage: 'Pilih file gambar yang valid.',
        imageTooLarge: 'Ukuran foto maksimal 5 MB.',
        nameAndRoleRequired: 'Nama dan posisi wajib diisi.',
        passwordTooShort: 'Kata sandi baru minimal 8 karakter.',
        passwordMismatch: 'Konfirmasi kata sandi belum cocok.',
        saveFailed: 'Perubahan tidak dapat disimpan. Coba lagi.',
        loadFailed: 'Data member tidak bisa dimuat. Coba buka halaman ini di browser modern.',
        emptyPhoto: 'Belum ada foto',
        openMenu: 'Buka menu',
        closeMenu: 'Tutup menu',
    },
    en: {
        homePageTitle: 'About HK Squad',
        homePageDescription: 'Meet HK Squad, an esports and gaming community growing together through solidarity and sportsmanship.',
        memberPageTitle: 'HK Squad Members',
        memberPageDescription: 'Meet HK Squad members and manage each member’s profile.',
        homeLinkLabel: 'HK Squad - Home',
        logoArtLabel: 'HK Squad logo',
        logoImageAlt: 'HK Squad logo with a wolf mascot',
        navigationMenu: 'Menu',
        languageSelectLabel: 'Choose language',
        themeOptionsLabel: 'Choose a theme color',
        themePurpleLabel: 'Purple',
        themeBlueLabel: 'Blue',
        themeGreenLabel: 'Green',
        themeRedLabel: 'Red',
        themeBlackLabel: 'Black',
        membersListLabel: 'List of 12 HK Squad members',
        closeDialogLabel: 'Close',
        memberPhotoPreview: 'Member photo preview',
        menuTitle: 'HK SQUAD MENU',
        aboutLink: 'About HK Squad',
        valuesLink: 'Our Values',
        memberLink: 'Member List',
        settingsTitle: 'Settings',
        languageLabel: 'Language',
        googleLoginLabel: 'Google admin login (optional)',
        googleSignedOut: 'Not signed in (optional)',
        googleSignedInAs: 'Signed in as',
        googleSignOut: 'Sign out',
        googleBackendMissing: 'The backend URL is not configured for GitHub Pages hosting.',
        googleScriptFailed: 'Google Sign-In could not be loaded.',
        googleAuthFailed: 'Google login failed. Please try again.',
        googleAdminDenied: 'This Google account is not an authorized admin.',
        googleAuthLocked: 'Too many attempts. Try again in 15 minutes.',
        googleLoginRequired: 'Sign in with the admin Google account from Settings first.',
        googleResetNotice: 'Sign in with the admin Google account before resetting the password.',
        emailAuthTitle: 'Visitor account (optional)',
        emailGoogleSignIn: 'Continue with Google',
        emailOr: 'or use email',
        emailLabel: 'Email',
        emailPasswordLabel: 'Password (at least 6 characters)',
        emailAuthReady: 'Sign in or register with email. Login is optional.',
        emailSignIn: 'Sign in',
        emailRegister: 'Register',
        emailReset: 'Forgot password?',
        emailSignOut: 'Sign out',
        emailFirebaseUnavailable: 'Email sign-in could not be loaded. Try reloading the page.',
        emailFirebaseNotConfigured: 'Firebase configuration was not found.',
        emailAuthRequiresWebOrigin: 'This page was opened directly as a file. Open it through localhost or HTTPS to enable sign-in.',
        emailAuthWorking: 'Processing your request...',
        emailSignedInAs: 'Signed in as',
        emailRegisterSuccess: 'Your account was created and you are signed in.',
        emailResetSent: 'A password reset email has been sent.',
        emailInvalid: 'Enter a valid email address.',
        emailWeakPassword: 'The password must be at least 6 characters.',
        emailAlreadyUsed: 'This email is already registered. Please sign in.',
        emailWrongCredentials: 'The email or password is incorrect.',
        emailTooManyRequests: 'Too many attempts. Try again later.',
        emailSignInDisabled: 'Email/password sign-in is not enabled in Firebase.',
        emailNetworkError: 'Could not connect. Check your internet connection.',
        emailAuthError: 'Sign-in failed. Check your email and password, then try again.',
        emailGoogleNotEnabled: 'Google sign-in is not enabled in Firebase.',
        emailGooglePopupBlocked: 'The Google popup was blocked. Allow popups and try again.',
        emailGooglePopupClosed: 'Google sign-in was cancelled.',
        emailGoogleDomainNotAllowed: 'This website domain is not authorized in Firebase Authentication.',
        emailGoogleAccountConflict: 'This email uses another sign-in method. Sign in with email and password first.',
        colorLabel: 'Theme color',
        heroEyebrow: 'ESPORTS & GAMING COMMUNITY',
        heroTitle: 'About',
        heroDescription: 'More than playing together. We build a close-knit team that supports one another and keeps growing with every match.',
        memberButton: 'View Squad Members',
        heroNote: 'SOLIDARITY · TEAMWORK · SPORTSMANSHIP',
        artCaption: 'EST. Hilang Koneksi',
        aboutEyebrow: 'WHO WE ARE',
        aboutHeading: 'Fighting as',
        teamHeading: 'one team.',
        aboutLead: '“Hilang Koneksi” (“Lost Connection”) is more than a name; it is a story of perseverance that we will always remember. Whenever we played Mobile Legends together, our internet connection was often our biggest challenge. As we fought for victory, the signal would often drop and disconnect us from the game. Even so, one friend always went the extra mile—travelling to a place called Matang Liang to find a better signal and rejoin the team. That search for a connection became a symbol of the spirit, patience, and solidarity within our squad. That is why we chose the name “Hilang Koneksi.” It reminds us that even when the signal disappears, our friendship, teamwork, and passion for playing together remain connected. Every lag, disconnect, and search for a signal is part of the journey that makes our squad unique. “The signal may fade, but our friendship stays connected.”',
        aboutBody: 'We believe every player can grow in a supportive environment. We celebrate wins together, and learn from losses to come back stronger.',
        valueSolidarity: 'Solidarity',
        valueSolidarityBody: 'Supporting one another and staying united in and out of the game.',
        valueTeamwork: 'Teamwork',
        valueTeamworkBody: 'Communicating, planning strategies, and reaching goals as one team.',
        valueFairPlay: 'Sportsmanship',
        valueFairPlayBody: 'Respecting opponents, accepting results, and keeping a positive attitude.',
        nextEyebrow: 'WHAT’S NEXT',
        nextHeading: 'Ready to be part of',
        nextHighlight: 'our journey?',
        memberPrompt: 'View and manage the 12 HK Squad member slots.',
        memberPageLink: 'Open member page',
        footerTagline: 'Stronger together, growing together.',
        membersEyebrow: 'MEET THE SQUAD',
        membersTitle: 'Members',
        membersDescription: 'Upload your photo here.',
        initialPasswordLabel: 'Initial password for all slots',
        memberNotice: 'To manage a profile, select a member slot and enter its password. Change the initial password in that member’s settings.',
        memberListTitle: 'Member List',
        memberSlotCount: '12 MEMBER SLOTS',
        backAbout: 'Back to About HK Squad',
        storageWarning: 'Data and photos are stored only in this browser/device. The password is a basic restriction, not server security; profiles are not synced across devices.',
        editMemberTitle: 'MEMBER SETTINGS',
        manageMember: 'Manage member',
        passwordLabel: 'Member password',
        forgotPasswordHint: 'After 3 failed attempts, sign in with the admin Google account from Settings to reset the password.',
        adminResetButton: 'Verify Google account & reset password',
        googleAuthWrong: 'The Google account could not be verified.',
        adminResetLocked: 'Too many attempts. Try again in 15 minutes.',
        adminResetFailed: 'The password could not be changed. Try again.',
        serverUnavailable: 'The reset backend could not be reached. Check the connection or backend URL configuration.',
        cancelButton: 'Cancel',
        continueButton: 'Continue',
        memberNameLabel: 'Member name',
        memberRoleLabel: 'Position / role',
        memberPhotoLabel: 'Profile photo (max. 5 MB)',
        deletePhotoButton: 'Remove photo',
        changePasswordTitle: 'Change password (optional)',
        changePasswordHint: 'Leave blank if you do not want to change the password.',
        newPasswordLabel: 'New password',
        confirmPasswordLabel: 'Confirm new password',
        saveChangesButton: 'Save changes',
        manageButton: 'Manage member',
        memberRole: 'HK Squad Member',
        wrongPassword: 'Incorrect password. Try again.',
        memberToast: 'Dantar’s team is ready to take them down!',
        passwordUnavailable: 'Unable to verify the password in this browser.',
        invalidImage: 'Choose a valid image file.',
        imageTooLarge: 'The photo must be 5 MB or smaller.',
        nameAndRoleRequired: 'Name and role are required.',
        passwordTooShort: 'The new password must be at least 8 characters.',
        passwordMismatch: 'The password confirmation does not match.',
        saveFailed: 'Could not save your changes. Try again.',
        loadFailed: 'Member data could not be loaded. Try opening this page in a modern browser.',
        emptyPhoto: 'No photo yet',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
    },
};

function currentLanguage() {
    return document.documentElement.lang === 'en' ? 'en' : 'id';
}

function translate(key) {
    return translations[currentLanguage()][key] || translations.id[key] || key;
}

function refreshGoogleAuthStatus() {
    const status = document.querySelector('#google-auth-status');
    const signOutButton = document.querySelector('#google-signout-button');
    if (!status) {
        return;
    }

    status.textContent = googleAuthEmail
        ? `${translate('googleSignedInAs')}: ${googleAuthEmail}`
        : translate(googleAuthStatusKey);
    if (signOutButton) {
        signOutButton.hidden = !googleAuthEmail;
    }
}

function clearGoogleAuthSession() {
    googleAuthEmail = '';
    googleAuthStatusKey = 'googleSignedOut';
    try {
        sessionStorage.removeItem('hk-squad-google-credential');
    } catch (error) {
        console.error('Tidak dapat menghapus sesi Login Google:', error);
    }
    refreshGoogleAuthStatus();
}

function applyLanguage(language) {
    const selectedLanguage = language === 'en' ? 'en' : 'id';

    document.documentElement.lang = selectedLanguage;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        const text = translations[selectedLanguage][key];

        if (text) {
            element.textContent = text;
        }
    });
    document.querySelectorAll('[data-i18n-content]').forEach((element) => {
        const content = translations[selectedLanguage][element.dataset.i18nContent];
        if (content) {
            element.setAttribute('content', content);
        }
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
        const label = translations[selectedLanguage][element.dataset.i18nAriaLabel];
        if (label) {
            element.setAttribute('aria-label', label);
        }
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
        const alt = translations[selectedLanguage][element.dataset.i18nAlt];
        if (alt) {
            element.setAttribute('alt', alt);
        }
    });

    const languageSelect = document.querySelector('#language-select');
    if (languageSelect) {
        languageSelect.value = selectedLanguage;
    }

    refreshDynamicContent();
    refreshGoogleSignInButton();
    refreshGoogleAuthStatus();
    refreshEmailAuth();

    document.querySelectorAll('.menu-btn').forEach((button) => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-label', translations[selectedLanguage][isOpen ? 'closeMenu' : 'openMenu']);
    });
}

function savePreference(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(`Tidak dapat menyimpan pengaturan ${key}:`, error);
    }
}

function applyTheme(theme) {
    const themeNames = ['purple', 'blue', 'green', 'red', 'black'];
    const selectedTheme = themeNames.includes(theme) ? theme : 'purple';

    document.body.dataset.theme = selectedTheme;
    document.querySelectorAll('[data-theme-choice]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.themeChoice === selectedTheme));
    });
}

try {
    applyTheme(localStorage.getItem('hk-squad-theme'));
    applyLanguage(localStorage.getItem('hk-squad-language'));
} catch (error) {
    console.error('Tidak dapat membaca pengaturan tersimpan:', error);
    applyTheme('purple');
    applyLanguage('id');
}

document.querySelector('#language-select')?.addEventListener('change', (event) => {
    applyLanguage(event.currentTarget.value);
    savePreference('hk-squad-language', event.currentTarget.value);
});

document.querySelectorAll('[data-theme-choice]').forEach((button) => {
    button.addEventListener('click', () => {
        applyTheme(button.dataset.themeChoice);
        savePreference('hk-squad-theme', button.dataset.themeChoice);
    });
});

function initializeGoogleSignIn() {
    const buttonContainers = document.querySelectorAll('.google-signin-button');
    if (buttonContainers.length === 0) {
        return;
    }

    const config = window.HK_SQUAD_AUTH_CONFIG || {};
    const googleClientId = typeof config.googleClientId === 'string' ? config.googleClientId.trim() : '';
    const apiBaseUrl = typeof config.apiBaseUrl === 'string' ? config.apiBaseUrl.trim().replace(/\/+$/, '') : '';
    const isGitHubPages = window.location.hostname.endsWith('.github.io');
    const signOutButton = document.querySelector('#google-signout-button');

    function setStatus(messageKey) {
        googleAuthStatusKey = messageKey;
        refreshGoogleAuthStatus();
    }

    function hideSignInButtons() {
        buttonContainers.forEach((container) => {
            container.hidden = true;
        });
    }

    function saveCredential(credential) {
        try {
            sessionStorage.setItem('hk-squad-google-credential', credential);
        } catch (error) {
            console.error('Tidak dapat menyimpan sesi Login Google:', error);
        }
    }

    function clearCredential() {
        clearGoogleAuthSession();
    }

    async function verifyCredential(credential) {
        const response = await fetch(`${apiBaseUrl}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential }),
        });
        const result = await response.json();

        if (!response.ok) {
            const error = new Error(result.error || 'GOOGLE_AUTH_FAILED');
            error.code = result.error;
            throw error;
        }
        return result.email;
    }

    function showAuthError(error) {
        const errorMessages = {
            ADMIN_RATE_LIMITED: 'googleAuthLocked',
            GOOGLE_ADMIN_REQUIRED: 'googleAdminDenied',
            GOOGLE_AUTH_FAILED: 'googleAuthWrong',
        };
        setStatus(errorMessages[error.code] || 'googleAuthFailed');
    }

    if (!googleClientId) {
        hideSignInButtons();
        setStatus('googleConfigMissing');
        return;
    }
    if (isGitHubPages && !apiBaseUrl) {
        hideSignInButtons();
        setStatus('googleBackendMissing');
        return;
    }
    if (!window.google?.accounts?.id) {
        hideSignInButtons();
        setStatus('googleScriptFailed');
        return;
    }

    window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async ({ credential }) => {
            if (!credential) {
                setStatus('googleAuthFailed');
                return;
            }

            try {
                googleAuthEmail = await verifyCredential(credential);
                saveCredential(credential);
                googleAuthStatusKey = 'googleSignedOut';
                refreshGoogleAuthStatus();
            } catch (error) {
                clearCredential();
                showAuthError(error);
                console.error('Login Google admin gagal diverifikasi:', error);
            }
        },
    });

    refreshGoogleSignInButton = () => {
        buttonContainers.forEach((container) => {
            container.replaceChildren();
            container.hidden = false;
            window.google.accounts.id.renderButton(container, {
                theme: 'outline',
                size: 'medium',
                text: 'signin_with',
                shape: 'rectangular',
                locale: currentLanguage(),
            });
        });
    };
    refreshGoogleSignInButton();

    if (signOutButton) {
        signOutButton.addEventListener('click', () => {
            window.google.accounts.id.disableAutoSelect();
            clearCredential();
            setStatus('googleSignedOut');
        });
    }

    try {
        const savedCredential = sessionStorage.getItem('hk-squad-google-credential');
        if (savedCredential) {
            verifyCredential(savedCredential).then((email) => {
                googleAuthEmail = email;
                refreshGoogleAuthStatus();
            }).catch((error) => {
                clearCredential();
                showAuthError(error);
                console.error('Sesi Login Google admin tidak dapat diverifikasi:', error);
            });
        }
    } catch (error) {
        console.error('Tidak dapat membaca sesi Login Google:', error);
        setStatus('googleAuthFailed');
    }
}

initializeGoogleSignIn();

function initializeFirebaseEmailAuth() {
    const form = document.querySelector('#email-auth-form');
    if (!form) {
        return;
    }

    const emailInput = document.querySelector('#email-auth-email');
    const passwordInput = document.querySelector('#email-auth-password');
    const status = document.querySelector('#email-auth-status');
    const actions = document.querySelector('#email-auth-actions');
    const googleSignInButton = document.querySelector('#email-google-sign-in-button');
    const divider = document.querySelector('#email-auth-divider');
    const googleActionButtons = [googleSignInButton, ...document.querySelectorAll('#email-auth-actions button')];
    const signOutButton = document.querySelector('#email-signout-button');
    let auth;
    let signedInUser = null;
    let statusKey = 'emailAuthReady';
    let configured = false;
    let isProcessing = false;

    function updateStatus() {
        if (signedInUser) {
            status.textContent = `${translate('emailSignedInAs')}: ${signedInUser.email}`;
        } else {
            status.textContent = translate(statusKey);
        }

        emailInput.labels[0].hidden = Boolean(signedInUser) || !configured;
        emailInput.hidden = Boolean(signedInUser) || !configured;
        passwordInput.labels[0].hidden = Boolean(signedInUser) || !configured;
        passwordInput.hidden = Boolean(signedInUser) || !configured;
        actions.hidden = Boolean(signedInUser) || !configured;
        googleSignInButton.hidden = Boolean(signedInUser) || !configured;
        divider.hidden = Boolean(signedInUser) || !configured;
        signOutButton.hidden = !signedInUser;
        googleActionButtons.forEach((button) => {
            button.disabled = !configured || isProcessing;
        });
        signOutButton.disabled = isProcessing;
    }

    function setStatus(key) {
        statusKey = key;
        updateStatus();
    }

    refreshEmailAuth = updateStatus;

    const firebaseConfig = window.HK_SQUAD_AUTH_CONFIG?.firebase;
    if (!firebaseConfig?.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
        setStatus('emailFirebaseNotConfigured');
        console.error('Konfigurasi Firebase Email/Password belum lengkap.');
        return;
    }
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') {
        setStatus('emailAuthRequiresWebOrigin');
        return;
    }
    if (!window.firebase?.initializeApp || !window.firebase.auth) {
        setStatus('emailFirebaseUnavailable');
        console.error('Firebase Authentication SDK tidak tersedia.');
        return;
    }

    try {
        const app = window.firebase.apps.length
            ? window.firebase.app()
            : window.firebase.initializeApp(firebaseConfig);
        auth = app.auth();
        configured = true;
        updateStatus();
    } catch (error) {
        setStatus('emailFirebaseUnavailable');
        console.error('Gagal menginisialisasi Firebase Authentication:', error);
        return;
    }

    const errorMessages = {
        'auth/invalid-email': 'emailInvalid',
        'auth/missing-email': 'emailInvalid',
        'auth/weak-password': 'emailWeakPassword',
        'auth/email-already-in-use': 'emailAlreadyUsed',
        'auth/invalid-credential': 'emailWrongCredentials',
        'auth/wrong-password': 'emailWrongCredentials',
        'auth/user-not-found': 'emailWrongCredentials',
        'auth/too-many-requests': 'emailTooManyRequests',
        'auth/operation-not-allowed': 'emailSignInDisabled',
        'auth/network-request-failed': 'emailNetworkError',
        'auth/popup-blocked': 'emailGooglePopupBlocked',
        'auth/popup-closed-by-user': 'emailGooglePopupClosed',
        'auth/unauthorized-domain': 'emailGoogleDomainNotAllowed',
        'auth/account-exists-with-different-credential': 'emailGoogleAccountConflict',
    };

    async function runAuthAction(action) {
        if (isProcessing) {
            return;
        }

        if (action !== 'google' && (!emailInput.reportValidity() || (action !== 'reset' && !passwordInput.reportValidity()))) {
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        statusKey = 'emailAuthWorking';
        isProcessing = true;
        updateStatus();

        try {
            if (action === 'google') {
                auth.languageCode = currentLanguage();
                const provider = new window.firebase.auth.GoogleAuthProvider();
                provider.setCustomParameters({ prompt: 'select_account' });
                await auth.signInWithPopup(provider);
                statusKey = 'emailAuthReady';
            } else if (action === 'register') {
                await auth.createUserWithEmailAndPassword(email, password);
                statusKey = 'emailRegisterSuccess';
            } else if (action === 'signIn') {
                await auth.signInWithEmailAndPassword(email, password);
                statusKey = 'emailAuthReady';
            } else {
                auth.languageCode = currentLanguage();
                await auth.sendPasswordResetEmail(email);
                statusKey = 'emailResetSent';
            }
        } catch (error) {
            statusKey = error.code === 'auth/operation-not-allowed' && action === 'google'
                ? 'emailGoogleNotEnabled'
                : errorMessages[error.code] || 'emailAuthError';
            console.error('Aksi Firebase Email/Password gagal:', error);
        } finally {
            isProcessing = false;
            updateStatus();
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        runAuthAction('signIn');
    });
    document.querySelector('#email-sign-in-button').addEventListener('click', () => runAuthAction('signIn'));
    document.querySelector('#email-register-button').addEventListener('click', () => runAuthAction('register'));
    document.querySelector('#email-reset-button').addEventListener('click', () => runAuthAction('reset'));
    googleSignInButton.addEventListener('click', () => runAuthAction('google'));
    signOutButton.addEventListener('click', async () => {
        isProcessing = true;
        updateStatus();
        try {
            await auth.signOut();
            statusKey = 'emailAuthReady';
            passwordInput.value = '';
        } catch (error) {
            statusKey = 'emailAuthError';
            console.error('Gagal keluar dari akun Firebase:', error);
        } finally {
            isProcessing = false;
            updateStatus();
        }
    });

    auth.onAuthStateChanged((user) => {
        signedInUser = user;
        if (!user && statusKey === 'emailRegisterSuccess') {
            statusKey = 'emailAuthReady';
        }
        updateStatus();
    }, (error) => {
        statusKey = 'emailAuthError';
        updateStatus();
        console.error('Gagal membaca status akun Firebase:', error);
    });
}

initializeFirebaseEmailAuth();

function setMenuOpen(isOpen) {
    if (!menuButton || !sidebar) {
        return;
    }

    sidebar.classList.toggle('active', isOpen);
    document.querySelector('.page-overlay')?.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', translate(isOpen ? 'closeMenu' : 'openMenu'));
}

if (menuButton && sidebar) {
    menuButton.addEventListener('click', () => {
        setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    overlays.forEach((element) => {
        element.addEventListener('click', () => setMenuOpen(false));
    });

    sidebar.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuOpen(false);
        }
    });
}

const memberGrid = document.querySelector('#member-grid');

if (memberGrid) {
    const databaseName = 'hk-squad-members';
    const databaseVersion = 1;
    const initialPassword = 'Dantar112*';
    const memberPasswordVersion = 2;
    const memberCount = 12;
    const dialog = document.querySelector('#member-dialog');
    const authForm = document.querySelector('#member-auth-form');
    const editor = document.querySelector('#member-editor');
    const editorForm = document.querySelector('#member-editor-form');
    const authPanel = document.querySelector('#member-auth-panel');
    const dialogTitle = document.querySelector('#member-dialog-title');
    const authError = document.querySelector('#member-auth-error');
    const forgotPasswordPanel = document.querySelector('#forgot-password-panel');
    const adminResetForm = document.querySelector('#admin-reset-form');
    const adminResetError = document.querySelector('#admin-reset-error');
    const editorError = document.querySelector('#member-editor-error');
    const photoInput = document.querySelector('#member-photo-input');
    const photoPreview = document.querySelector('#member-photo-preview');
    const emptyPhoto = document.querySelector('#member-photo-empty');
    const nameInput = document.querySelector('#member-name-input');
    const roleInput = document.querySelector('#member-role-input');
    const clearPhotoButton = document.querySelector('#clear-member-photo');
    const closeDialogButtons = document.querySelectorAll('[data-close-dialog]');
    let database;
    let selectedMember;
    let passwordAttempts = 0;
    let currentMembers = [];
    let stagedPhoto;
    let photoPreviewUrl;
    const memberToast = document.querySelector('#member-toast');

    if (memberToast) {
        window.setTimeout(() => {
            memberToast.hidden = false;
            memberToast.classList.add('visible');
        }, 150);
        window.setTimeout(() => {
            memberToast.classList.remove('visible');
            window.setTimeout(() => {
                memberToast.hidden = true;
            }, 300);
        }, 4200);
    }

    function openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(databaseName, databaseVersion);

            request.addEventListener('upgradeneeded', () => {
                const store = request.result.createObjectStore('members', { keyPath: 'id' });
                store.createIndex('order', 'order', { unique: true });
            });
            request.addEventListener('success', () => resolve(request.result));
            request.addEventListener('error', () => reject(request.error));
        });
    }

    function getMembers() {
        return new Promise((resolve, reject) => {
            const request = database.transaction('members', 'readonly')
                .objectStore('members')
                .getAll();

            request.addEventListener('success', () => resolve(request.result));
            request.addEventListener('error', () => reject(request.error));
        });
    }

    function saveMember(member) {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction('members', 'readwrite');
            transaction.objectStore('members').put(member);
            transaction.addEventListener('complete', resolve);
            transaction.addEventListener('error', () => reject(transaction.error));
            transaction.addEventListener('abort', () => reject(transaction.error));
        });
    }

    function encodeBytes(bytes) {
        return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    async function hashPassword(password, salt) {
        const digest = await crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(`${salt}:${password}`)
        );
        return encodeBytes(new Uint8Array(digest));
    }

    function createSalt() {
        return encodeBytes(crypto.getRandomValues(new Uint8Array(16)));
    }

    async function initializeMembers() {
        const existingMembers = await getMembers();
        const existingIds = new Set(existingMembers.map((member) => member.id));
        const migratedMembers = await Promise.all(existingMembers.map(async (member) => {
            if (member.passwordVersion >= memberPasswordVersion) {
                return member;
            }

            const passwordSalt = createSalt();
            const migratedMember = {
                ...member,
                passwordSalt,
                passwordHash: await hashPassword(initialPassword, passwordSalt),
                passwordVersion: memberPasswordVersion,
            };
            await saveMember(migratedMember);
            return migratedMember;
        }));
        const newMembers = await Promise.all(
            Array.from({ length: memberCount }, async (_, index) => {
                if (existingIds.has(index + 1)) {
                    return null;
                }

                const salt = createSalt();

                return {
                    id: index + 1,
                    order: index + 1,
                    name: `Anggota ${String(index + 1).padStart(2, '0')}`,
                    role: translate('memberRole'),
                    photo: null,
                    passwordSalt: salt,
                    passwordHash: await hashPassword(initialPassword, salt),
                    passwordVersion: memberPasswordVersion,
                };
            })
        );

        for (const member of newMembers) {
            if (member) {
                await saveMember(member);
            }
        }

        return [...migratedMembers, ...newMembers.filter(Boolean)];
    }

    function displayMemberName(name) {
        const defaultName = /^(?:Anggota|Member) (\d{2})$/.exec(name);
        if (!defaultName) {
            return name;
        }

        const label = currentLanguage() === 'en' ? 'Member' : 'Anggota';
        return `${label} ${defaultName[1]}`;
    }

    function storedMemberName(name) {
        const defaultName = /^(?:Anggota|Member) (\d{2})$/.exec(name);
        return defaultName ? `Anggota ${defaultName[1]}` : name;
    }

    function renderMembers(members) {
        currentMembers = members;
        memberGrid.replaceChildren();

        members.sort((first, second) => first.order - second.order);
        members.forEach((member) => {
            const memberName = displayMemberName(member.name);
            const card = document.createElement('article');
            card.className = 'member-card';

            const portrait = document.createElement('div');
            portrait.className = 'member-portrait';

            if (member.photo) {
                const image = document.createElement('img');
                image.src = URL.createObjectURL(member.photo);
                image.alt = `${currentLanguage() === 'en' ? 'Photo of' : 'Foto'} ${memberName}`;
                image.addEventListener('load', () => URL.revokeObjectURL(image.src), { once: true });
                portrait.append(image);
            } else {
                const placeholder = document.createElement('span');
                placeholder.className = 'member-placeholder';
                placeholder.textContent = String(member.order).padStart(2, '0');
                portrait.append(placeholder);
            }

            const details = document.createElement('div');
            details.className = 'member-details';

            const name = document.createElement('h3');
            name.textContent = memberName;

            const role = document.createElement('p');
            role.textContent = ['Member HK Squad', 'HK Squad Member'].includes(member.role)
                ? translate('memberRole')
                : member.role;

            const manageButton = document.createElement('button');
            manageButton.className = 'manage-member-btn';
            manageButton.type = 'button';
            manageButton.textContent = translate('manageButton');
            manageButton.addEventListener('click', () => openMemberDialog(member));

            details.append(name, role, manageButton);
            card.append(portrait, details);
            memberGrid.append(card);
        });
    }

    refreshDynamicContent = () => {
        renderMembers(currentMembers);
        if (selectedMember) {
            dialogTitle.textContent = `${translate('manageMember')} ${displayMemberName(selectedMember.name)}`;
        }
    };

    function setPhotoPreview(photo) {
        if (photoPreviewUrl) {
            URL.revokeObjectURL(photoPreviewUrl);
            photoPreviewUrl = undefined;
        }

        if (photo) {
            photoPreviewUrl = URL.createObjectURL(photo);
            photoPreview.src = photoPreviewUrl;
            photoPreview.hidden = false;
            emptyPhoto.hidden = true;
            clearPhotoButton.disabled = false;
            return;
        }

        photoPreview.removeAttribute('src');
        photoPreview.hidden = true;
        emptyPhoto.hidden = false;
        emptyPhoto.textContent = translate('emptyPhoto');
        clearPhotoButton.disabled = true;
    }

    function openMemberDialog(member) {
        selectedMember = member;
        stagedPhoto = member.photo;
        dialogTitle.textContent = `${translate('manageMember')} ${displayMemberName(member.name)}`;
        authPanel.hidden = false;
        editor.hidden = true;
        authError.textContent = '';
        forgotPasswordPanel.hidden = true;
        adminResetError.textContent = '';
        passwordAttempts = 0;
        editorError.textContent = '';
        authForm.reset();
        adminResetForm.reset();
        editorForm.reset();
        nameInput.value = displayMemberName(member.name);
        roleInput.value = member.role;
        setPhotoPreview(stagedPhoto);
        dialog.showModal();
        document.querySelector('#member-current-password').focus();
    }

    authForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        authError.textContent = '';

        try {
            const password = document.querySelector('#member-current-password').value;
            const passwordHash = await hashPassword(password, selectedMember.passwordSalt);

            if (passwordHash !== selectedMember.passwordHash) {
                authError.textContent = translate('wrongPassword');
                passwordAttempts += 1;
                if (passwordAttempts >= 3) {
                    forgotPasswordPanel.hidden = false;
                    refreshGoogleSignInButton();
                }
                return;
            }

            forgotPasswordPanel.hidden = true;
            authPanel.hidden = true;
            editor.hidden = false;
            document.querySelector('#member-name-input').focus();
        } catch (error) {
            authError.textContent = translate('passwordUnavailable');
            console.error('Gagal memeriksa kata sandi anggota:', error);
        }
    });

    adminResetForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        adminResetError.textContent = '';

        const credential = (() => {
            try {
                return sessionStorage.getItem('hk-squad-google-credential');
            } catch (error) {
                console.error('Tidak dapat membaca sesi Login Google:', error);
                return null;
            }
        })();
        const newPassword = document.querySelector('#admin-new-password').value;
        const confirmPassword = document.querySelector('#admin-confirm-password').value;

        if (!credential) {
            adminResetError.textContent = translate('googleLoginRequired');
            return;
        }

        if (newPassword.length < 8) {
            adminResetError.textContent = translate('passwordTooShort');
            return;
        }

        if (newPassword !== confirmPassword) {
            adminResetError.textContent = translate('passwordMismatch');
            return;
        }

        try {
            const config = window.HK_SQUAD_AUTH_CONFIG || {};
            const apiBaseUrl = typeof config.apiBaseUrl === 'string' ? config.apiBaseUrl.trim().replace(/\/+$/, '') : '';
            const response = await fetch(`${apiBaseUrl}/api/admin/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    credential,
                    memberId: selectedMember.id,
                    newPassword,
                }),
            });
            const result = await response.json();

            if (!response.ok) {
                if (['GOOGLE_AUTH_FAILED', 'GOOGLE_ADMIN_REQUIRED'].includes(result.error)) {
                    clearGoogleAuthSession();
                }
                const errorKey = {
                    ADMIN_RATE_LIMITED: 'adminResetLocked',
                    GOOGLE_ADMIN_REQUIRED: 'googleAdminDenied',
                    GOOGLE_AUTH_FAILED: 'googleAuthWrong',
                }[result.error] || 'adminResetFailed';
                adminResetError.textContent = translate(errorKey);
                return;
            }

            const updatedMember = {
                ...selectedMember,
                passwordSalt: result.passwordSalt,
                passwordHash: result.passwordHash,
                passwordVersion: memberPasswordVersion,
            };
            await saveMember(updatedMember);
            selectedMember = updatedMember;
            renderMembers(await getMembers());
            authPanel.hidden = true;
            editor.hidden = false;
            document.querySelector('#member-name-input').focus();
        } catch (error) {
            adminResetError.textContent = translate('serverUnavailable');
            console.error('Gagal menghubungi backend untuk reset kata sandi:', error);
        }
    });

    photoInput.addEventListener('change', () => {
        editorError.textContent = '';
        const [file] = photoInput.files;

        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            photoInput.value = '';
            editorError.textContent = translate('invalidImage');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            photoInput.value = '';
            editorError.textContent = translate('imageTooLarge');
            return;
        }

        stagedPhoto = file;
        setPhotoPreview(stagedPhoto);
    });

    clearPhotoButton.addEventListener('click', () => {
        stagedPhoto = null;
        photoInput.value = '';
        setPhotoPreview(null);
    });

    editorForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        editorError.textContent = '';

        const name = nameInput.value.trim();
        const role = roleInput.value.trim();
        const newPassword = document.querySelector('#member-new-password').value;
        const confirmPassword = document.querySelector('#member-confirm-password').value;

        if (!name || !role) {
            editorError.textContent = translate('nameAndRoleRequired');
            return;
        }

        if (newPassword && newPassword.length < 8) {
            editorError.textContent = translate('passwordTooShort');
            return;
        }

        if (newPassword && newPassword !== confirmPassword) {
            editorError.textContent = translate('passwordMismatch');
            return;
        }

        try {
            const updatedMember = {
                ...selectedMember,
                name: storedMemberName(name),
                role,
                photo: stagedPhoto,
            };

            if (newPassword) {
                updatedMember.passwordSalt = createSalt();
                updatedMember.passwordHash = await hashPassword(newPassword, updatedMember.passwordSalt);
                updatedMember.passwordVersion = memberPasswordVersion;
            }

            await saveMember(updatedMember);
            selectedMember = updatedMember;
            renderMembers(await getMembers());
            dialog.close();
        } catch (error) {
            editorError.textContent = translate('saveFailed');
            console.error('Gagal menyimpan data anggota:', error);
        }
    });

    closeDialogButtons.forEach((button) => {
        button.addEventListener('click', () => dialog.close());
    });

    dialog.addEventListener('close', () => {
        if (photoPreviewUrl) {
            URL.revokeObjectURL(photoPreviewUrl);
            photoPreviewUrl = undefined;
        }
    });

    async function startMemberPage() {
        try {
            if (!window.indexedDB || !window.crypto?.subtle) {
                throw new Error('Browser tidak mendukung penyimpanan atau pemeriksaan kata sandi yang diperlukan.');
            }

            database = await openDatabase();
            renderMembers(await initializeMembers());
        } catch (error) {
            memberGrid.innerHTML = '';
            const message = document.querySelector('#member-load-error');
            message.hidden = false;
            message.textContent = translate('loadFailed');
            console.error('Gagal memuat data anggota HK Squad:', error);
        }
    }

    startMemberPage();
}