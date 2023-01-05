const yup = require('yup');

module.exports.HERO_SCHEMA = yup.object({
    nickname: yup.string().required('Nickname is required. Hello from mv-SCHEMA').min(4),
    realName: yup.string().required('Real name of superhero is required. Hello from mv-SCHEMA').min(1),
    originDescription: yup.string(),
    cathPhrase: yup.string()
});