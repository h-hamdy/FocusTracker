import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthDtoSignup, AuthDtoSignin} from './dto';

@Controller('auth')
export class AuthController {
	constructor (private authService: AuthService) {}

	@Post("signup")
	async signup(@Body() dto: AuthDtoSignup) {
		console.log(dto)
		return this.authService.signup(dto);
	}

	@Post("signin")
	async signin(@Body() dto: AuthDtoSignin, @Res({ passthrough: true }) response: Response) {
		const token = await this.authService.signin(dto);
		console.log(token);
		(response as any).cookie('jwt', token, {
			httpOnly: true,
			// secure: false, 
		});

		return { message: 'Login successful' };
	}
}
