import { IsNotEmpty, IsString } from "class-validator"

export class AuthDtoSignup {

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	confirmationPassword: string;
}

export class AuthDtoSignin {

	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}