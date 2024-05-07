import Session from '@/object/session';

export default class OAuth{
	static userObjectName = "cellia-chat";

	constructor(){}

	static setUser(session){
		localStorage.setItem(OAuth.userObjectName, JSON.stringify(session));
	}

	static parseUser(){
		return JSON.parse(localStorage.getItem(this.userObjectName));
	}

	static getUser (){
		return new Session(this.parseUser());
	}

	static getAccessToken(){
		return this.hasUser() ? this.parseUser() : '';
	}

	static getCreatedAt(){
		return this.hasUser() ? this.parseUser().created_at : '';
	}

	static getUpdatedAt(){
		return this.hasUser() ? this.parseUser().updated_at : '';
	}

	static getExpiresAt(){
		return this.hasUser() ? this.parseUser().expires_at : '';
	}

	static hasUser(){
		return this.parseUser() !== null;
	}


	static removeSession(){
		localStorage.removeItemItem(OAuth.userObjectName);
	}
}