import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const StudyContext = createContext();
export const StudyProvider = ({ children }) => {
    const [studyData, setStudyData] = useState(null);
    const [vocabularyData, setVocabularyData] = useState(null);
    const [studySets, setStudySets] = useState(null);
    const [updateFlashCardData, setUpdateFlashCardData] = useState(null);
    const { user } = useAuth();

    const fetchStudySets = async () => {
        if (!user || !user._id) {
            return;
        }
        getStudyData();

    };

    useEffect(() => {
        if (user && user._id) {
            fetchStudySets();
        }
    }, [user]);

    // // Handle
    // async function updateMarkLearned(learned) {
    //     var MarkLearned = '';
    //     var countLearned = 0;
    //     for (let i = 0; i < studyData.total; i++) {
    //         const isLearnHas = learned.has(i);
    //         MarkLearned += isLearnHas ? '1' : '0';
    //         countLearned += isLearnHas ? 1 : 0;
    //     }
    //     vocabularyData.MarkLearned = MarkLearned;
    //     studyData.learned = countLearned;
    //     await updateVocabularyData(vocabularyData);
    //     await updatestudyData(studyData);
    // }

    return (
        <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
    );
};

export const useStudy = () => {
    const context = useContext(StudyContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
