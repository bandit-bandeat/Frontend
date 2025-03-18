import React from 'react';
import ChangerTemplate from "./ChangerTemplate";
import { BotContainer } from '../styles/BotStyles';
import {changeMp3} from '../api/chordApi';

const RecommendBot = () => {
    const handleForm = async (formData) => {
        console.log("폼 제출 실행됨")
        const response = await changeMp3(formData);
        console.log(response);
        return response;
    };

    return (
        <BotContainer>
            <ChangerTemplate
                botName="Mp3"
                onSendForm={handleForm}
                placeholder="어떤 장르를 원하시나요?"
            />
        </BotContainer>
    );
};

export default RecommendBot;