<p>

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo-small.svg"  width="100"  alt="Nest Logo"  /></a>

</p>

## Insomnia

Insomnia API 설계 플랫폼과의 협업 및 표준을 통해 고품질 API를 제공합니다.

https://insomnia.rest

https://github.com/Kong/insomnia

Insomnia 다운로드

https://insomnia.rest/download

# **ARCHITECTURE OF NESTJS**

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

1. app : 앱 구동

2. AppModule : 모든 것의 root 모듈, import해와서 선언해줌

3. AppController : get url (routing) and return function

4. AppService : executing business login

## Modules

**모듈은 @Module() 데코레이터로 주석이 달린 클래스입니다.** (@어쩌고를 데코레이터라고 함)

(@Module 데코레이터를 가진 클래스가 모듈)

@Module() 데코레이터는 Nest가 애플리케이션 구조를 구성하는 데 사용하는 메타데이터를 제공합니다.

모듈은 Nest에서 애플리케이션 구조를 범위로 구성하는 데 사용됩니다. 컨트롤러와 프로바이더는 선언된 모듈에 따라 범위가 지정됩니다. 모듈과 해당 클래스(컨트롤러 및 프로바이더)는 Nest가 DI(종속성 주입)를 수행하는 방법을 결정하는 그래프를 형성합니다.

https://docs.nestjs.com/modules#modules

## Controllers

컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환하는 역할을 합니다. express의 라우터 같은 역할을 한다.

ex) app.get("/", handleHome);

https://docs.nestjs.com/controllers#controllers

**@Get()**

라우트 핸들러(메소드) 데코레이터.

HTTP GET 요청을 지정된 경로로 라우팅합니다.

https://docs.nestjs.com/controllers#routing

# **REST API**

## Param decorators

Nest는 HTTP 라우트 핸들러와 함께 사용할 수 있는 유용한 **매개변수 데코레이터 세트 @Param, @Body, @Query**를 제공합니다. 다음은 제공된 데코레이터와 이들이 나타내는 일반 Express(또는 Fastify) 객체의 목록입니다.

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

**constructor 메서드는 클래스의 인스턴스 객체를 생성하고 초기화하는 특별한 메서드입니다.**

또한 constructor를 사용하면 다른 모든 메서드 호출보다 앞선 시점인,

인스턴스 객체를 초기화할 때 수행할 초기화 코드를 정의할 수 있습니다.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/constructor

## Built-in HTTP exceptions

Nest는 기본 **HttpException에서 상속되는 일련의 표준 예외를 제공**합니다. 이들은 @nestjs/common 패키지에서 노출되며 가장 일반적인 HTTP 예외를 나타냅니다.

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
	new ValidationPipe({
		whitelist: true,
		forbidNonWhitelisted: true,
		transform: true,
	}),
);
```

https://docs.nestjs.com/techniques/validation#transform-payload-objects

## Mapped types

npm i @nestjs/mapped-types 또는
npm i --save @nestjs/swagger를 통해 PartialType을 가져올 수 있습니다.

**Partial**

input validation types(DTO라고도 함)을 빌드할 때 동일한 유형에 대한 create 및 update 변형을 빌드하는 것이 종종 유용합니다. 예를 들어, create에는 모든 필드가 필요할 수 있지만 update는 모든 필드를 선택 사항으로 만들 수 있습니다. Nest는 이 작업을 더 쉽게 만들고 상용구를 최소화하기 위해 PartialType() 유틸리티 함수를 제공합니다. PartialType() 함수는 입력 유형의 모든 속성이 **선택 사항으로 설정**된 유형(클래스)을 반환합니다.

https://docs.nestjs.com/openapi/mapped-types#partial

class validator

https://github.com/typestack/class-validator

https://www.npmjs.com/package/class-validator

## Performance (Fastify)

기본적으로 Nest는 Express 프레임워크를 사용합니다. 앞서 언급했듯이 Nest는 Fastify와 같은 다른 라이브러리와의 호환성도 제공합니다.  
Fastify는 Express와 유사한 방식으로 설계 문제를 해결하기 때문에 Nest에 대한 좋은 대안 프레임워크를 제공합니다. fastify는 Express보다 훨씬 빠르며 거의 2배 더 나은 벤치마크 결과를 달성합니다.  
https://docs.nestjs.com/techniques/performance#performance-fastify

Request, Response Object (비추천)

```
@Request(), @Req()
req

@Response(), @Res()
res
```

https://docs.nestjs.com/controllers#request-object

# **UNIT TESTING**

## Jest

Jest는 단순함에 초점을 맞춘 유쾌한 JavaScript 테스팅 프레임워크입니다.  
Babel, TypeScript, Node, React, Angular, Vue 등을 사용하는 프로젝트에서 작동합니다!

https://jestjs.io/

**it()**  
테스트 클로저를 생성합니다.  
it()대신 test()도 사용 가능

**expect()**  
값을 테스트할 때마다 expect 함수가 사용됩니다. expect하나만 콜하는 경우는 거의 없을 것입니다.

toBe()는 Object.is를 사용하여 정확한 동등성을 테스트합니다. 객체의 값을 확인하려면 대신 toEqual()을 사용하세요.

String  
toMatch를 사용하여 정규 표현식에 대해 문자열을 확인할 수 있습니다.  
ex) expect('Christoph').toMatch(/stop/);

Arrays and iterables  
toContain()을 사용하여 배열 또는 이터러블에 특정 항목이 포함되어 있는지 확인할 수 있습니다.  
ex) expect(shoppingList).toContain('milk');

Exceptions  
특정 함수가 호출될 때 오류가 발생하는지 테스트하려면 toThrow를 사용하십시오.  
예외를 발생시키는 함수는 래핑 함수 내에서 호출해야 합니다. 그렇지 않으면 toThrow 어설션이 실패합니다.  
ex) expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');

https://jestjs.io/docs/getting-started

toBeInstanceOf()  
.toBeInstanceOf(Class)를 사용하여 객체가 클래스의 인스턴스인지 확인하십시오.  
https://jestjs.io/docs/expect#tobeinstanceofclass

Exceptions  
영화를 못 찾았을 때, 던지는 404 에러를 아래와 같이 테스트할 수도 있습니다.

```
expect(() => moviesService.getMovie(999)).toThrow();
expect(() => moviesService.getMovie(999)).toThrowError();
expect(() => moviesService.getMovie(999)).toThrow('Not Found Movie: 999');
expect(() => moviesService.getMovie(999)).toThrow(/Not Found Movie: 999/g);
```

https://jestjs.io/docs/using-matchers#exceptions

beforeEach(fn, timeout)  
각각의 테스트가 실행되기 전에 매번 함수를 실행합니다.  
각각의 테스트 전에 각 테스트에서 사용할 전역 상태를 재설정하려는 경우에 유용합니다.  
함수가 promise을 반환하거나 generator인 경우 Jest는 테스트를 실행하기 전에 해당 promise가 해결될 때까지 기다립니다.  
밀리초로 대기할 시간을 지정할 수 있습니다. (기본 시간 5초)  
https://jestjs.io/docs/api#beforeeachfn-timeout

beforeAll(fn, timeout)  
모든 테스트가 실행되기 전에 딱 한 번 함수를 실행합니다.

afterEach(fn, timeout)  
각각의 테스트가 완료된 후 함수를 실행합니다.

afterAll(fn, timeout)  
모든 테스트가 완료된 후 함수를 실행합니다.
