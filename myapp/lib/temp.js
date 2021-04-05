var conf = require("../lib/conf");
module.exports = {
    checkPassword: function () {
        let template = `
        <!DOCTYPE html>
        <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Garden's Graden</title>
                <meta name="description" content="">
                <meta name="keywords" content="">
                <meta name="author" content="">
                <link rel="stylesheet" href="https://unpkg.com/tailwindcss/dist/tailwind.min.css">
            </head>
            <body>
                <div class="text-center">
                    <div class="text-3xl mb-5 mt-16 text-blue-700 font-black">
                        아이디와 비밀번호를 입력해주세요
                    </div>
                    <div>
                        <form action="${conf.Address}logincheck" method="post">
                            <div class="text-center">
                                <input type="text" name="userId" placeholder="아이디"
                                class="w-60 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
                            </div>
                            <div class="text-center">
                                <input type="text" name="userPassword" placeholder="비밀번호"
                                class="w-60 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
                            </div>
                            <div>
                                <button type="submit"
                                class="md:w-40 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition cursor-pointer ease-in-out duration-300 mx-auto">
                                로그인
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        </html>
        `;

        return template;
    },
    main: function (info, inOut, allList, chart) {
        // class="bg-gradient-to-r from-gray-200 to-gray-400"
        msg = `
        <!DOCTYPE html>
        <html lang="ko" class="bg-blue-100">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Garden's Graden</title>
                <meta name="description" content="">
                <meta name="keywords" content="">
                <meta name="author" content="">
                <link rel="stylesheet" href="https://unpkg.com/tailwindcss/dist/tailwind.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js" integrity="sha512-d9xgZrVZpmmQlfonhQUvTR7lMPtO7NkZMkA0ABN3PHCbKA5nqylQ/yWlFAyY6hYgdF1Qh6nYiuADWwKB4C2WSw==" crossorigin="anonymous"></script>
            </head>
            <body class="w-screen">

                ${info}

                
                ${inOut}


                ${allList}

                ${chart}

            </body>
        </html>
        `;

        return msg;
    },
    info: function (userName, record, pro) {
        msg = `
        <div id="profile" class="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32">
            <div class="w-full rounded-lg shadow-2xl bg-white opacity-75 mx-6">
    
    
                <div class="p-4 text-center">
                    <div class="block rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                        style="background-image: url('${conf.Address}images/title.PNG')"></div>
                    <h1 class="text-3xl font-bold pt-8 text-center">${userName}</h1>
                    <div class="mx-auto w-full pt-3 border-b-2 border-green-500 opacity-25"></div>
                    
                    <p class="pt-4 text-base flex items-center justify-center">
                        <svg class="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                        </svg>오늘의 기록
                    </p>

                    <div class="flex flex-col">
                        <div class="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full pb-2 align-middle sm:px-6 lg:px-8">
                                <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                                    <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    나간 시간
                                                </th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    들어온 시간
                                                </th>
                                                <th scope="col"
                                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                                    사유
                                                </th>
                                                <th scope="col"
                                                    class="py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                                                    부재 시간
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            
                                            ${record}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${pro}
        </div>`;

        return msg;
    },
    in: function (userId, userPassword, userName) {
        msg = `
        <div class="text-center mt-24">
            <h1 class="font-black text-3xl mb-3">현황 갱신</h1>
            <h1 class="font-black mb-3 text-red-500 text-xs">교실로 돌아오셨으면 아래의 버튼을 눌러주세요<h1>
            <div class="mb-24">
                <form action="${conf.Address}enter" method="post">
                    <input type="hidden" name="userId" value="${userId}">
                    <input type="hidden" name="userPassword" value="${userPassword}">
                    <input type="hidden" name="userName" value="${userName}">
                    <div class="text-center">
                        <button type="submit"
                        class="shadow-lg md:w-40 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition cursor-pointer ease-in-out duration-300 mx-auto">
                        다녀왔습니다
                        </button>
                    </div>
                <form>
            </div>
        </div>
        `;
        return msg;
    },
    out: function (userId, userPassword, userName) {
        msg = `
        <div class="text-center mt-24">
            <h1 class="font-black text-3xl mb-2">현황 갱신</h1>
            <h1 class="font-black mb-3 text-red-500 text-xs">현재 외출하는 이유를 간략하게 작성해주세요<h1>
            <div class="mb-24">
                <form action="${conf.Address}leave" method="post">
                    <input type="hidden" name="userId" value="${userId}">
                    <input type="hidden" name="userPassword" value="${userPassword}">
                    <input type="hidden" name="userName" value="${userName}">
                    <div class="text-center">
                        <input type="text" name="reason" placeholder="무슨 용무로 나가세요?"
                        class="shadow-lg text-center w-60 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
                    </div>
                    <div class="text-center">
                        <button type="submit"
                        class="shadow-lg md:w-40 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition cursor-pointer ease-in-out duration-300 mx-auto">
                        다녀오겠습니다
                        </button>
                    </div>
                <form>
            </div>
        </div>
        `;
        return msg;
    },
    allList: function (allList) {
        msg = `
            <div class="mb-5 mt-10 text-center">
                <h1 class="font-black text-3xl mb-3">현재 교실 현황</h1>
                <h1 class="font-black text-red-500">빨간색 : 교실 밖<h1>
                <h1 class="font-black mb-3 text-red-500 text-xs">< 이름 (외출 횟수) (현재 외출 사유) ><h1>
                <h1 class="font-black text-green-500">초록색 : 교실 안<h1>
                <h1 class="font-black mb-10 text-green-500 text-xs">< 이름 (외출 횟수) ><h1>
                ${allList}
            </div>
        `;
        return msg;
    },
    chart: function (date, chart) {
        msg = `
        <div class="text-center mt-24">
        <h1 class="font-black text-3xl mb-3">${date}</h1>
        <h1 class="font-black text-lg text-red-500">확인하실 날짜를 포멧에 맞춰 입력해주세요</h1>
        <h1 class="font-black text-sm mb-3 text-red-300">(YYYY-MM-DD)</h1>
            <form action="${conf.Address}changeDate" method="post" class="text-center">
                <div class="text-center">
                    <input type="text" name="date" placeholder="날짜"
                    class="w-60 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
                </div>
                <div>
                    <button type="submit"
                    class="md:w-40 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition cursor-pointer ease-in-out duration-300 mx-auto">
                    확인
                    </button>
                </div>
            </form>
        <div>
        <div class="text-center w-screen p-10">
            <div class="text-center p-7 w-11/12 h-2/6 m-auto bg-white shadow-2xl">
                <canvas id="myChart" class="text-center w-10/12 h-10"></canvas>
            </div>
        </div>
        ${chart}
        `;
        return msg;
    },
};
