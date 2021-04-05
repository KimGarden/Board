var express = require("express");
var router = express.Router();
const db = require("../lib/db");
var conf = require("../lib/conf");
var temp = require("../lib/temp");

router.use(express.urlencoded({ extended: false }));

var today = "";
var year = "";
var month = "";
var day = "";
db.query(`SELECT now() AS today`, function (error, results) {
    if (error) {
        throw error;
    } else {
        let todayData = results[0].today.split(" ");
        today = todayData[0];
        let arr = todayData[0].split("-");
        year = arr[0];
        month = arr[1];
        day = arr[2];
    }
});

router.get("/", function (req, res, next) {
    let msg = "";
    msg = temp.checkPassword();
    res.send(msg);
});

/* GET home page. */
router.post("/logincheck", function (req, res, next) {
    let userId = req.body.userId;
    let userPassword = req.body.userPassword;
    db.query(`SELECT * FROM user WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results.length == 0) {
                res.write("<script language='javascript'>alert('Incorrect Id')</script>");
                res.write(
                    "<script language='javascript'>window.location='" + conf.Address + "'</script>"
                );
            } else {
                res.send(`
                <form name="form" action="${conf.Address}login" method="post">
                    <input type="hidden" name="userId" value="${userId}">
                    <input type="hidden" name="userPassword" value="${userPassword}">
                    <input type="hidden" name="userName" value="${results[0].name}">
                </form>
                <script language="javascript">
                    document.form.submit();
                </script>`);
            }
        }
    });
});

router.post("/login", function (req, res, next) {
    const userName = req.body.userName;
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    let resultHTML = "";
    let info = "";
    let inOut = "";
    let allList = "";

    db.query(`SELECT password FROM user WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results[0].password == userPassword) {
                db.query(
                    `SELECT * FROM checktime WHERE userId=? AND date=?`,
                    [userId, today],
                    function (error2, results2) {
                        if (error2) {
                            throw error2;
                        } else {
                            var today = " ";
                            if (results2.length == 0) {
                                today += "기록이 없습니다";
                            } else if (results2.length % 2 == 0) {
                                for (let i = 0; i < results2.length; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    let result = (
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                        60
                                    ).toFixed(1);
                                    today += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${result}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                            } else {
                                for (let i = 0; i < results2.length - 1; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    let result = (
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                        60
                                    ).toFixed(1);
                                    today += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${result}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                                today += `
                                        <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                            <td class="px-6 py-4 text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                    ${results2[results2.length - 1].time}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-purple-800 bg-purple-100 rounded-full">
                                                    진행 중
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                    ${results2[results2.length - 1].reason}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        진행 중
                                                    </span>
                                                </td>
                                        </tr>`;
                            }
                            info += temp.info(userName, today, "");

                            db.query(
                                `SELECT inClass FROM user WHERE id=?`,
                                [userId],
                                function (error3, resulut3) {
                                    if (error3) {
                                        throw error3;
                                    } else {
                                        // 밖에서 들어오는 경우
                                        if (resulut3[0].inClass == 0) {
                                            inOut += temp.in(userId, userPassword, userName);
                                        }
                                        // 안에서 나가는 경우
                                        else {
                                            inOut += temp.out(userId, userPassword, userName);
                                        }

                                        db.query(`SELECT * FROM user`, function (error4, result4) {
                                            let allPeople = "";
                                            for (let i = 0; i < result4.length; i++) {
                                                if (result4[i].inClass == 0) {
                                                    allPeople += `
                                                                <div
                                                                    class="shadow-lg inline-block font-semibold leading-5 text-red-800 bg-red-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5">
                                                                    ${result4[i].name} (${result4[i].count}) (${result4[i].lastReason})
                                                                </div>
                                                            `;
                                                }
                                            }
                                            for (let i = 0; i < result4.length; i++) {
                                                if (result4[i].inClass == 1) {
                                                    allPeople += `
                                                                <div
                                                                    class="shadow-lg inline-block font-semibold leading-5 text-green-800 bg-green-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5">
                                                                    ${result4[i].name} (${result4[i].count})
                                                                </div>
                                                            `;
                                                }
                                            }
                                            allPeople += `<div class="mb-40"></div>`;
                                            allList = temp.allList(allPeople);
                                            resultHTML = temp.main(info, inOut, allList, "");
                                            res.send(resultHTML);
                                        }); // result4 query문 종료
                                    }
                                } // result3 fucntion 종료
                            ); // result3 query문 종료
                        }
                    } // result2 function 종료
                ); // result2 query문 종료
            } else {
                res.write("<script language='javascript'>alert('Incorrect Password')</script>");
                res.write(
                    "<script language='javascript'>window.location='" + conf.Address + "'</script>"
                );
            }
        }
    });
});

router.post("/enter", function (req, res, next) {
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    const userName = req.body.userName;

    db.query(`UPDATE user SET inClass=1 WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            db.query(
                `INSERT INTO checktime(userId, time, reason, date) VALUES(?, now(), "", ?)`,
                [userId, today],
                function (error2, result2) {
                    if (error2) {
                        throw error2;
                    } else {
                        res.send(`
                        <form name="form" action="${conf.Address}login" method="post">
                            <input type="hidden" name="userId" value="${userId}">
                            <input type="hidden" name="userPassword" value="${userPassword}">
                            <input type="hidden" name="userName" value="${userName}">
                        </form>
                        <script language="javascript">
                            document.form.submit();
                        </script>`);
                    }
                }
            );
        }
    });
});

router.post("/leave", function (req, res, next) {
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    const userName = req.body.userName;
    const reason = req.body.reason;

    db.query(`UPDATE user SET inClass=0 WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            db.query(
                `INSERT INTO checktime(userId, time, reason, date) VALUES(?, now(), ?, ?)`,
                [userId, reason, today],
                function (error2, result2) {
                    if (error2) {
                        throw error2;
                    } else {
                        db.query(
                            `UPDATE user SET count = count + 1 WHERE id=?`,
                            [userId],
                            function (error2, results2) {
                                if (error2) {
                                    throw error2;
                                } else {
                                    db.query(
                                        `UPDATE user SET lastReason = ? WHERE id=?`,
                                        [reason, userId],
                                        function (error3, result3) {
                                            if (error3) {
                                                throw error3;
                                            } else {
                                                res.send(`
                                                <form name="form" action="${conf.Address}login" method="post">
                                                    <input type="hidden" name="userId" value="${userId}">
                                                    <input type="hidden" name="userPassword" value="${userPassword}">
                                                    <input type="hidden" name="userName" value="${userName}">
                                                </form>
                                                <script language="javascript">
                                                    document.form.submit();
                                                </script>`);
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    });
});

router.get("/pro", function (req, res, next) {
    res.redirect(`${conf.Address}pro/${today}`);
});

router.get("/pro/:date", function (req, res, next) {
    let resultHTML = "";
    let allList = "";
    let chart = "";

    db.query(`SELECT * FROM user`, function (error, result) {
        if (error) {
            throw error;
        } else {
            let allPeople = "";
            for (let i = 0; i < result.length; i++) {
                if (result[i].inClass == 0) {
                    allPeople += `
                    <form action="${conf.Address}checkInfo" method="post" class="inline-block">
                        <input type="hidden" name="userId" value="${result[i].id}">
                        <input type="hidden" name="userPassword" value="${result[i].password}">
                        <input type="hidden" name="userName" value="${result[i].name}">
                        <input class="shadow-lg inline-block font-semibold leading-5 text-red-800 bg-red-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5" type="submit" value="${result[i].name} (${result[i].count}) (${result[i].lastReason})">
                    </form>
                `;
                }
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i].inClass == 1) {
                    allPeople += `
                    <form action="${conf.Address}checkInfo" method="post" class="inline-block">
                        <input type="hidden" name="userId" value="${result[i].id}">
                        <input type="hidden" name="userPassword" value="${result[i].password}">
                        <input type="hidden" name="userName" value="${result[i].name}">
                        <input class="shadow-lg inline-block font-semibold leading-5 text-green-800 bg-green-100 rounded-full mr-2 mb-2 py-0 px-3 text-xs font-semibold h-5" type="submit" value="${result[i].name} (${result[i].count})">
                    </form>
                `;
                }
            }
            allList = temp.allList(allPeople);
            db.query(
                `SELECT * FROM user LEFT JOIN countrecord ON user.id = countrecord.userId WHERE countrecord.date=?`,
                [req.params.date],
                function (error2, results2) {
                    if (error2) {
                        throw error2;
                    } else {
                        if (req.params.date == today) {
                            let myChart =
                                "<script>let myChart = document.getElementById('myChart').getContext('2d');";
                            myChart += "let dataChart = new Chart(myChart, {";
                            myChart += "type: 'line',";
                            myChart += "data: {";
                            myChart += "labels: [";
                            for (let i = 0; i < result.length; i++) {
                                if (i == result.length - 1) {
                                    myChart += "'" + result[i].name + "'],";
                                    break;
                                }
                                myChart += "'" + result[i].name + "', ";
                            }
                            myChart += "datasets: [{";
                            myChart += "label: '외출 횟수',";
                            myChart += "data: [";
                            for (let i = 0; i < result.length; i++) {
                                if (i == result.length - 1) {
                                    myChart += result[i].count + "]";
                                    break;
                                }
                                myChart += result[i].count + ", ";
                            }
                            myChart += ",backgroundColor:['rgba(255, 255, 237)']";
                            myChart += "}]";
                            myChart += "}});</script>";
                            let title = req.params.date + " 부재 현황 그래프";
                            chart = temp.chart(title, myChart);
                        } else if (results2.length == 0) {
                            chart = temp.chart("데이터가 존재하지 않습니다", "");
                        } else {
                            let myChart =
                                "<script>let myChart = document.getElementById('myChart').getContext('2d');";
                            myChart += "let dataChart = new Chart(myChart, {";
                            myChart += "type: 'line',";
                            myChart += "data: {";
                            myChart += "labels: [";
                            for (let i = 0; i < results2.length; i++) {
                                if (i == results2.length - 1) {
                                    myChart += "'" + results2[i].name + "'],";
                                    break;
                                }
                                myChart += "'" + results2[i].name + "', ";
                            }
                            myChart += "datasets: [{";
                            myChart += "label: '외출 횟수',";
                            myChart += "data: [";
                            for (let i = 0; i < results2.length; i++) {
                                if (i == results2.length - 1) {
                                    myChart += results2[i].countRecord + "]";
                                    break;
                                }
                                myChart += results2[i].countRecord + ", ";
                            }
                            myChart += ",backgroundColor:['rgba(255, 255, 237)']";
                            myChart += "}]";
                            myChart += "}});</script>";
                            let title = req.params.date + " 부재 현황 그래프";
                            chart = temp.chart(title, myChart);
                        }
                        resultHTML = temp.main("", "", allList, chart);
                        res.send(resultHTML);
                    }
                }
            );
        }
    });
});

router.post("/checkInfo", function (req, res, next) {
    const userName = req.body.userName;
    const userId = req.body.userId;
    const userPassword = req.body.userPassword;
    let resultHTML = "";
    let info = "";

    db.query(`SELECT password FROM user WHERE id=?`, [userId], function (error, results) {
        if (error) {
            throw error;
        } else {
            if (results[0].password == userPassword) {
                db.query(
                    `SELECT * FROM checktime WHERE userId=? AND date=?`,
                    [userId, today],
                    function (error2, results2) {
                        if (error2) {
                            throw error2;
                        } else {
                            var todayData = " ";
                            if (results2.length == 0) {
                                todayData += `
                                    <div class="m-3">
                                        <h1 class="font-xl text-red-500 font-black">기록이 없습니다</h1>
                                    </div>
                                `;
                            } else if (results2.length % 2 == 0) {
                                for (let i = 0; i < results2.length; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    let result = (
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                        60
                                    ).toFixed(1);
                                    todayData += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${result}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                            } else {
                                for (let i = 0; i < results2.length - 1; i += 2) {
                                    let arrOut = results2[i].time.split(" ");
                                    let arrIn = results2[i + 1].time.split(" ");
                                    let timeOut = arrOut[1].split(":");
                                    let timeIn = arrIn[1].split(":");
                                    let result = (
                                        ((timeIn[0] - timeOut[0]) * 3600 +
                                            (timeIn[1] - timeOut[1]) * 60 +
                                            (timeIn[2] - timeOut[2])) /
                                        60
                                    ).toFixed(1);
                                    todayData += `
                                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td class="px-6 py-4 text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                        ${results2[i].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                        ${results2[i + 1].time}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                        ${results2[i].reason}
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        ${result}분
                                                    </span>
                                                </td>
                                            </tr>`;
                                }
                                todayData += `
                                        <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                                            <td class="px-6 py-4 text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                                                    ${results2[results2.length - 1].time}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-left  whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-purple-800 bg-purple-100 rounded-full">
                                                    진행 중
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                                                <span
                                                    class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-blue-100 rounded-full">
                                                    ${results2[results2.length - 1].reason}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <span
                                                        class="cursor-default inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">
                                                        진행 중
                                                    </span>
                                                </td>
                                        </tr>`;
                            }
                            pro = `
                                <div class="w-full text-center mt-5">
                                <button class="bg-red-600 text-white w-2/12 p-1 shadow-lg rounded-xl font-bold" onClick="location.href='${conf.Address}pro/${today}'">목록으로</button>
                                <div>
                            `;
                            info += temp.info(userName, todayData, pro);
                            resultHTML = temp.main(info, "", "", "");
                            res.send(resultHTML);
                        }
                    } // result2 function 종료
                ); // result2 query문 종료
            }
        }
    });
});

router.get("/reset", function (req, res, next) {
    res.send(
        `   
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
                    <div class="text-3xl mb-5 mt-16 text-red-500 font-black">
                        삭제 페이지입니다
                    </div>
                    <div>
                        <form action="${conf.Address}resetData" method="post">
                            <div class="text-center">
                                <input type="text" name="date" placeholder="날짜"
                                class="w-60 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none">
                            </div>
                            <div>
                                <button type="submit"
                                class="md:w-40 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition cursor-pointer ease-in-out duration-300 mx-auto">
                                초기화
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </body>
        `
    );
});

router.post("/resetData", function (req, res, next) {
    let date = req.body.date;

    db.query(`SELECT * FROM user`, function (error, results) {
        for (let i = 0; i < results.length; i++) {
            db.query(`INSERT INTO countrecord(userId, countRecord, date) VALUES (?, ?, ?)`, [
                results[i].id,
                results[i].count,
                date,
            ]);
        }
        db.query(`UPDATE user SET count=0, inClass=1, lastReason=""`, function (error2, results2) {
            if (error2) {
                throw error2;
            } else {
                res.send("OK");
            }
        });
    });
});

router.post("/changeDate", function (req, res, next) {
    res.redirect(`${conf.Address}pro/${req.body.date}`);
});

module.exports = router;
