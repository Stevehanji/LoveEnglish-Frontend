import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const { user } = useAuth();

async function getStudyData() {
    try {
        const res = await axios.get(`${URL}/StudySets/get?user_id=${user._id}`);
        if (res.data && Array.isArray(res.data)) {
            // setStudySets(res.data);
            return res.data;
        }
    } catch (error) {
        console.error('Error fetching study sets:', error);
        // setStudySets([]);
    }
}

async function updateStudyData(newStudyData: any) {
    try {
        const res = await axios.post(
            `${URL}/StudySets/update`,
            newStudyData
        );
    } catch (error) {
        console.log(error);
    }
}

// async function deleteStudyData(flashCard_id) {
//     try {
//         const res = await axios.post(
//             `${URL}/StudySets/delete?flashCard_id=${flashCard_id}`);
//     } catch (error) {
//         console.log(error);
//     }

//     try {
//         const res = await axios.post(
//             `${URL}/vocabulary/delete?flashCard_id=${flashCard_id}`);
//     } catch (error) {
//         console.log(error);
//     }

//     await fetchStudySets();
// }

export const studySetService = {
    getStudyData,
    updateStudyData
}