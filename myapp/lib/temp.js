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
                <title>WD3J 외출 현황</title>
                <meta name="description" content="">
                <meta name="keywords" content="">
                <meta name="author" content="">
                <link rel="stylesheet" href="https://unpkg.com/tailwindcss/dist/tailwind.min.css">
            </head>
            <body class="bg-blue-100">
            </script>
            <div class="font-sans w-9/12 mx-auto">
                <div class="relative min-h-screen flex flex-col sm:justify-center items-center mt-12 lg:mt-0">
                    <div class="relative sm:max-w-sm w-full">
                        <div class="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
                        <div class="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
                        <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                            <label for="" class="block text-lg text-gray-700 text-center font-semibold">
                                WD3J 외출 현황 관리
                            </label>
                            <form action="${conf.Address}loginwho" method="post" class="mt-10">
                                <div>
                                    <input type="text" name="userId" placeholder="ID" class="px-3 mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 border-4 border-blue-400 border-opacity-50">
                                </div>
                    
                                <div class="mt-7">                
                                    <input type="password" name="userPassword" placeholder="Password" class="px-3 mt-1 block w-full bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 border-4 border-red-400 border-opacity-50">                           
                                </div>
                    
                                <div class="flex mt-7 items-center text-center">
                                    <hr class="border-gray-300 border-1 w-full rounded-md">
                                    <label class="block font-medium text-sm text-gray-700 w-full">
                                        Login
                                    </label>
                                    <hr class="border-gray-300 border-1 w-full rounded-md">
                                </div>
                    
                                <div class="flex mt-7 justify-center w-full">
                                    <input type="submit" name="action" value="학생 로그인" class="mr-5 text-xs lg:font-base bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                    
                                    <input type="submit" name="action" value="교원 로그인" class="text-xs lg:font-base bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                </div>

                                <div class="flex mt-7 items-center text-center">
                                    <hr class="border-gray-300 border-1 w-full rounded-md">
                                    <label class="block font-medium text-sm text-gray-700 w-full">
                                        Setup
                                    </label>
                                    <hr class="border-gray-300 border-1 w-full rounded-md">
                                </div>

                                <div class="mt-7 mb-7 text-center">
                                    <input type="submit" name="action" value="관리자 페이지" class="text-xs lg:font-base bg-blue-500 py-2 w-6/12 mx-auto rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        </html>
        `;

        return template;
    },
    main: function (info, inOut, allList, chart, bulletin) {
        // class="bg-gradient-to-r from-gray-200 to-gray-400"
        msg = `
        <!DOCTYPE html>
        <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>WD3J 외출 현황</title>
                <meta name="description" content="">
                <meta name="keywords" content="">
                <meta name="author" content="">
                <link rel="stylesheet" href="https://unpkg.com/tailwindcss/dist/tailwind.min.css">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js" integrity="sha512-d9xgZrVZpmmQlfonhQUvTR7lMPtO7NkZMkA0ABN3PHCbKA5nqylQ/yWlFAyY6hYgdF1Qh6nYiuADWwKB4C2WSw==" crossorigin="anonymous"></script>
            </head>
            <body class="w-screen bg-blue-100 overflow-x-hidden">

                ${info}

                
                ${inOut}


                ${allList}

                ${chart}

                ${bulletin}

            </body>
        </html>
        `;
        return msg;
    },
    info: function (userName, record, pro) {
        msg = `
        <div class="card bg-blue-200 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6 z-0 hidden lg:block"></div>
        <div class="card bg-red-200 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6 z-0 hidden lg:block"></div>
        <div id="profile" class="max-w-4xl items-center h-auto flex-wrap mx-auto my-32 hidden lg:flex">
            <div class="w-full rounded-lg shadow-2xl bg-white mx-6 z-10">
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
                                                    class="py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase hidden lg:block">
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
        <div class="text-center mt-60 mb-36 relative">
            <h1 class="font-black text-xl lg:text-3xl mb-3">현황 갱신</h1>
            <h1 class="font-black mb-3 text-red-500 text-sm">교실로 돌아오셨으면 아래의 버튼을 눌러주세요<h1>
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
        <div class="text-center mt-28 mb-28 relative">
            <h1 class="font-black text-xl lg:text-3xl mb-2">현황 갱신</h1>
            <h1 class="font-black mb-3 text-red-500 text-sm">현재 외출하는 이유를 간략하게 작성해주세요<h1>
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
    allList: function (allList, allListM) {
        msg = `
        <div class="relative mt-24">
            <div class="w-screen lg:w-8/12 mx-auto">
                <div class="mb-5 mt-10 text-center hidden lg:block inline-block z-10">
                    <h1 class="font-black text-xl lg:text-3xl mb-3 z-10">교실 현황</h1>
                    <h1 class="font-black text-red-500">빨간색 : 교실 밖<h1>
                    <h1 class="font-black mb-3 text-red-500 text-xs">< 이름 (외출 횟수) (현재 외출 사유) ><h1>
                    <h1 class="font-black text-green-500">초록색 : 교실 안<h1>
                    <h1 class="font-black mb-10 text-green-500 text-xs">< 이름 (외출 횟수) ><h1>
                    ${allList}
                </div>
                <div class="mb-5 mt-10 text-center lg:hidden z-10">
                    <h1 class="font-black text-xl lg:text-3xl mb-3">현재 교실 현황</h1>
                    <h1 class="font-black text-red-500">빨간색 : 교실 밖<h1>
                    <h1 class="font-black mb-3 text-red-500 text-xs">< 이름 (외출 횟수) (현재 외출 사유) ><h1>
                    <h1 class="font-black text-green-500">초록색 : 교실 안<h1>
                    <h1 class="font-black mb-10 text-green-500 text-xs">< 이름 (외출 횟수) ><h1>
                    ${allListM}
                </div>
            </div>
        </div>
        `;
        return msg;
    },
    chart: function (date, chart) {
        msg = `
        <div class="text-center mt-32 relative">
        <h1 class="font-black text-xl lg:text-3xl lg:mb-3">${date}</h1>
        <h1 class="font-black text-sm lg:text-lg text-red-500">확인하실 날짜를 포멧에 맞춰 입력해주세요</h1>
            <form action="${conf.Address}changeDate" method="post" class="text-center">
                <div class="text-center">
                    <input type="text" name="date" placeholder="YYYY-MM-DD"
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
        
        <div class="text-center w-screen pt-3 lg:p-10 relative z-10">
        <div class="card bg-yellow-200 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6 z-0 hidden lg:block"></div>
            <div class="text-center lg:p-7 w-11/12 h-2/6 m-auto bg-white shadow-2xl relative">
                <canvas id="myChart" class="text-center w-10/12 h-10"></canvas>
            </div>
        </div>
        ${chart}
        
        <form action="${conf.Address}upload" method="post" enctype="multipart/form-data" class="mt-32 relative">
            <div class="w-full h-full">
                <div class="card bg-purple-200 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6 z-0 hidden lg:block"></div>
            </div>
            <h1 class="font-black text-xl lg:text-3xl mb-7 relative">게시글 작성</h1>
            <h1 class="relative">제목</h1>
            <div>
                <input type="text" name="title" class="w-60 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none shadow-xl relative">
            </div>
            <h1 class="relative">내용</h1>
            <div>
                <textarea name="content" class="w-80 h-96 mt-2 py-3 px-3 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none resize-none shadow-xl relative"></textarea>
            </div>
            <h1 class="font-black text-base text-red-500 class="relative"">파일은 한 번에 3개까지만 선택해 주세요</h1>
            <div class="text-center relative">
                <input type="file" id="file" name="file" multiple>
            </div>
            <div>
                <input type="submit" value="작성" class="relative mb-16 md:w-40 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition cursor-pointer ease-in-out duration-300 mx-auto">
            </div>
        </form>
        `;
        return msg;
    },
    rank: function (many, long, month) {
        let msg = `
        <div class="card bg-blue-200 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6 z-0 hidden lg:block"></div>
        <div class="card bg-red-200 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6 z-0 hidden lg:block"></div>
        <div class="block lg:flex text-center mb-24 mt-10 relative">
            <div class="w-2/12">
            </div>
            <div class="w-full lg:w-4/12 mb-10 mx-auto">
                <h1 class="font-black text-xl lg:text-3xl mt-10 mb-7 text-black">${month}월 [횟수] 상위 5인 &#128400<h1>
                ${many}
            </div>
            <div class="w-full lg:w-4/12 mb-10 mx-auto">
                <h1 class="font-black text-xl lg:text-3xl mt-10 mb-7 text-black">${month}월 [시간] 상위 5인 &#128400<h1>
                ${long}
            </div>
            <div class="w-2/12">
            </div>
        </div>
        `;

        return msg;
    },
    bulletin: function (boardTable) {
        let msg = `<h1 class="font-black text-xl lg:text-3xl mb-3 block h-8 mt-28 text-center z-10">게시판</h1>
                <div class="w-full text-center flex mb-16 relative">
                <div class="card bg-pink-200 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6 z-0 hidden lg:block"></div>
                <div class="card bg-green-200 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-12 z-0 hidden lg:block"></div>
                    <div class="flex-1 w-6/12 p-5 h-72 overflow-hidden overflow-y-scroll text-center m-0 z-10" id="boardBox">
                        <div class="flex flex-col">
                            <div class="overflow-x-auto -mx-8">
                                <div class="inline-block w-9/12 lg:w-6/12 pb-10 align-middle">
                                    <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                                        <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 w-6/12">
                                                        Title
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 w-full hidden lg:block">
                                                        Date
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">
                                                
                                                ${boardTable}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

        return msg;
    },
    board: function (title, date, content, file1, file2, file3) {
        msg = `<!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>WD3J 외출 현황</title>
                <meta name="description" content="">
                <meta name="keywords" content="">
                <meta name="author" content="">
                <link rel="stylesheet" href="https://unpkg.com/tailwindcss/dist/tailwind.min.css">
            </head>
            <body class="bg-blue-100 text-center w-full">
            <div class="w-full text-center">
                <div class="w-full text-center font-black text-xl lg:text-3xl mt-16 text-blue-700">
                    <textarea class="w-72 h-8 lg:h-10 resize-none overflow-visible text-center bg-blue-200" readonly>${title}</textarea>
                </div>
                <div class="w-full text-center my-3" readonly>
                    ${date}
                </div>
                <div class="w-full text-center m-0">
                    <textarea class="w-72 h-52 resize-none overflow-y-auto" readonly>${content}</textarea>
                </div>
                <div class="w-full text-center">
                    ${file1}
                </div>
                <div class="w-full text-center">
                    ${file2}
                </div>
                <div class="w-full text-center">
                    ${file3}
                </div>
                <div>
                    <button class="mt-5 bg-red-600 text-white w-28 p-1 shadow-lg rounded-xl font-bold" onClick="window.history.back()">목록으로</button>
                </div>
            </div>
            </body>
        `;

        return msg;
    },
};
