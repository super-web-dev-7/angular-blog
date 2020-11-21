import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UrlJSON} from '../../utils/UrlJson';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    constructor(private http: HttpClient) {
    }

    questionPost(data) {
        return this.http.post<any>(`${UrlJSON.QuestionUrl}/addQuestion`, data);
    }

    getQuestionById(id) {
        return this.http.get(`${UrlJSON.QuestionUrl}/getQuestion/${id}`)
    }

    editQuestionById(data) {
        return this.http.put(`${UrlJSON.QuestionUrl}/editQuestion/${data._id}`, data);
    }

    addPicture(data, id) {
        return this.http.put(`${UrlJSON.QuestionUrl}/addPicture/${id}`, data)
    }

    deletePicture(picture, id) {
        return this.http.put(`${UrlJSON.QuestionUrl}/deletePicture/${id}`, {picture: picture})
    }

    getQuestions(filteredData) {
        return this.http.get(`${UrlJSON.QuestionUrl}/getQuestions?start=${filteredData.start}&keyword=${filteredData.keyword}&category=${filteredData.category}&isAnswered=${filteredData.isAnswered}&isApproved=${filteredData.isApproved}`);
    }

    getMoreQuestions(data) {
        return this.http.get(`${UrlJSON.QuestionUrl}/getMoreQuestions?start=${data.start}&end=${data.end}&isAnswered=${data.isAnswered}&isApproved=${data.isApproved}`);
    }

    approveQuestion(id, approved) {
        return this.http.put(`${UrlJSON.QuestionUrl}/approveQuestion/${id}`, {approved: approved});
    }

    addCategory(category) {
        return this.http.post(`${UrlJSON.CategoryUrl}/addCategory`, category);
    }

    getCategory() {
        return this.http.get(`${UrlJSON.CategoryUrl}/getAllCategory`);
    }

    addAnswer(answer, id) {
        return this.http.put(`${UrlJSON.QuestionUrl}/addAnswer/${id}`, answer)
    }

    editAnswer(answer, id) {
        return this.http.put(`${UrlJSON.QuestionUrl}/editAnswer/${id}`, answer)
    }

    // addLanguage(data) {
    //     return this.http.post(`${UrlJSON.languageUrl}/addLanguage`, data);
    // }
    //
    // deleteLanguage(id) {
    //     return this.http.delete(`${UrlJSON.languageUrl}/deleteLanguage/${id}`);
    // }
    //
    // editLanguage(data) {
    //     return this.http.put(`${UrlJSON.languageUrl}/editLanguage/${data._id}`, data);
    // }
}
