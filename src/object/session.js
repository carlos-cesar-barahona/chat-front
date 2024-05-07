export default class Session{
	constructor({accessToken,created_at,expires_at,updated_at}){
		this.accessToken = accessToken;
		this.created_at = created_at;
		this.expires_at = expires_at;
		this.updated_at = updated_at;
	}
}