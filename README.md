<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>
## Insomnia

Insomnia API 설계 플랫폼과의 협업 및 표준을 통해 고품질 API를 제공합니다.  
https://insomnia.rest  
https://github.com/Kong/insomnia

Insomnia 다운로드  
https://insomnia.rest/download

## NestJS Setup

Nest CLI를 사용하면 새 프로젝트를 설정하는 것이 매우 간단합니다.  
npm이 설치된 상태에서 OS 터미널에서 다음 명령을 사용하여 새 Nest 프로젝트를 만들 수 있습니다.  
nest new로 프로젝트 생성이 안된다면 npx nest new로 진행

```
npm install --location=global @nestjs/cli
nest new project-name
```

https://docs.nestjs.com/first-steps

     [nest 간단 이해] MCS, modules -> controller -> service 3개 알기!
     1) app : 앱 구동
     2) AppModule : 모든 것의 root 모듈, import해와서 선언해줌
     3) AppController : get url (routing) and return function
     4) AppService : executing business login

## Modules

모듈은 @Module() 데코레이터로 주석이 달린 클래스입니다. (@어쩌고를 데코레이터라고 함)
(@Module 데코레이터를 가진 클래스가 모듈)  
@Module() 데코레이터는 Nest가 애플리케이션 구조를 구성하는 데 사용하는 메타데이터를 제공합니다.  
모듈은 Nest에서 애플리케이션 구조를 범위로 구성하는 데 사용됩니다. 컨트롤러와 프로바이더는 선언된 모듈에 따라 범위가 지정됩니다. 모듈과 해당 클래스(컨트롤러 및 프로바이더)는 Nest가 DI(종속성 주입)를 수행하는 방법을 결정하는 그래프를 형성합니다.

https://docs.nestjs.com/modules#modules

## Controllers

컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환하는 역할을 합니다. express의 라우터 같은 역할을 한다.  
ex) app.get("/", handleHome);  
https://docs.nestjs.com/controllers#controllers

@Get()  
라우트 핸들러(메소드) 데코레이터.  
HTTP GET 요청을 지정된 경로로 라우팅합니다.  
https://docs.nestjs.com/controllers#routing

## Param decorators

Nest는 HTTP 라우트 핸들러와 함께 사용할 수 있는 유용한 매개변수 데코레이터 세트를 제공합니다. 다음은 제공된 데코레이터와 이들이 나타내는 일반 Express(또는 Fastify) 객체의 목록입니다.

```
// NestJS
@Param(param?: string)

// ExpressJS
req.params / req.params[param]

// NestJS
@Body(param?: string)

// ExpressJS
req.body / req.body[param]

// NestJS
@Query(param?: string)

// ExpressJS
req.query / req.query[param]
```

https://docs.nestjs.com/custom-decorators#param-decorators

## constructor

constructor 메서드는 클래스의 인스턴스 객체를 생성하고 초기화하는 특별한 메서드입니다.  
또한 constructor를 사용하면 다른 모든 메서드 호출보다 앞선 시점인,  
인스턴스 객체를 초기화할 때 수행할 초기화 코드를 정의할 수 있습니다.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/constructor

## Built-in HTTP exceptions

Nest는 기본 HttpException에서 상속되는 일련의 표준 예외를 제공합니다. 이들은 @nestjs/common 패키지에서 노출되며 가장 일반적인 HTTP 예외를 나타냅니다.

https://docs.nestjs.com/exception-filters#built-in-http-exceptions

## Validation

웹 애플리케이션으로 전송되는 데이터의 검증을 도와줍니다.  
들어오는 요청을 자동으로 검증하기 위해 Nest는 즉시 사용할 수 있는 여러 파이프를 제공합니다.  
ValidationPipe는 강력한 클래스 유효성 검사기 패키지와 선언적 유효성 검사 데코레이터를 사용합니다. ValidationPipe는 들어오는 모든 클라이언트 페이로드에 대해 유효성 검사 규칙을 적용하는 편리한 접근 방식을 제공합니다.  
https://docs.nestjs.com/techniques/validation

    내장 ValidationPipe사용을 위한 class-validator, class-transformer설치
    npm i --save class-validator class-transformer

**자동 검증**  
애플리케이션 수준에서 ValidationPipe를 바인딩하는 것으로 시작하겠습니다.  
따라서 모든 엔드포인트가 잘못된 데이터를 수신하지 못하도록 보호됩니다.  
https://docs.nestjs.com/techniques/validation

**whitelist**  
true로 설정하면 유효성 검사기는 class-validator의 유효성 검사 데코레이터를 적어도 하나라도 사용하지 않은 모든 속성 객체를 제거합니다.

**forbidNonWhitelisted**  
true로 설정하면 화이트리스트에 없는 속성을 제거하는 대신 유효성 검사기가 예외를 throw합니다.

**transform (자동 형변환)**  
네트워크를 통해 들어오는 payload는 일반 JavaScript 객체입니다. ValidationPipe는 payload를 DTO 클래스에 따라 유형이 지정된 객체로 자동 변환할 수 있습니다. 자동 변환을 활성화하려면 transform을 true로 설정하십시오. 이 동작을 전역적으로 활성화하려면 전역 파이프에서 옵션을 설정합니다.

```
app.useGlobalPipes(
	new  ValidationPipe({
		whitelist:  true,
		forbidNonWhitelisted:  true,
		transform:  true,
	}),
);
```

https://docs.nestjs.com/techniques/validation#transform-payload-objects
