export const translate = async (language) => {
    let languageTranslation;

    console.log(language);
    
    if (language === "en-US") {
        languageTranslation = await import("$lib/translations/en_us");
        return languageTranslation.translation;
    }

    switch (language.substr(0,2)) {
        case "es":
            languageTranslation = await import("$lib/translations/es");
            return languageTranslation.translation;
        case "fr":
            languageTranslation = await import("$lib/translations/fr");
            return languageTranslation.translation;
        case "de":
            languageTranslation = await import("$lib/translations/de");
            return languageTranslation.translation;
        // no english needed, because default is english
        default:
            languageTranslation = await import("$lib/translations/en");
            return languageTranslation.translation;
    }
}