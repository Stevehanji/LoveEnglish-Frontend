import axios from 'axios';

async function getVocabularyData(data) {
    setStudyData(data);
    try {
        const res = await axios.get(
            `${URL}/vocabulary/get?flashCard_id=${data._id}`,);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

async function updateVocabularyData(VocabularyData: any) {
    try {
        const res = await axios.post(
            `${URL}/vocabulary/update`, VocabularyData);
    } catch (error) {
        console.log(error);
    }
}



// async function createNewStudySets(newStudyData, newVocabularyData) {
//     try {
//         const total = newVocabularyData.length;
//         console.log(newStudyData);
//         const res = await axios.post(
//             `${URL}/StudySets/create`,
//             { newStudyData, total, user_id: user._id }
//         );

//         await axios.post(
//             `${URL}/vocabulary/create?flashCard_id=${res.data._id}`,
//             { newVocabularyData, total });

//     } catch (error) {
//         console.log(error);
//     }
//     await fetchStudySets();
// }

export const vocabularyService = {
    getVocabularyData,
    updateVocabularyData
}