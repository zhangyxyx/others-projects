import Mock from "mockjs"
Mock.setup()
//使用mockjs模拟数据
Mock.mock("/api/getTable", "get", (req, res) => {
    return {
        "success":true,
        "result":{
            "page": 1,
            "total": 12,
            "list":[
                {
                    "id":1,
                    "name":"John Brown",
                    "age":20,
                    "sex":"male",
                    "address":"New York No. 1 Lake Park",
                    "hobby":"电影",
                    "state":1,
                    "number":"111"
                },
                {
                    "id":2,
                    "name":"Jim Green",
                    "age":22,
                    "sex":"female",
                    "address":"London No. 1 Lake Park",
                    "hobby":"旅游，摄影",
                    "state":2,
                    "number":"222"
                },
                {
                    "id":3,
                    "name":"Joe Black",
                    "age":23,
                    "sex":"male",
                    "address":"Sidney No. 1 Lake Park",
                    "hobby":"音乐",
                    "state":2,
                    "number":"333"
                },
                {
                    "id":4,
                    "name":"John Davi",
                    "age":20,
                    "sex":"male",
                    "address":"New York No. 2 Lake Park",
                    "hobby":"电影,音乐",
                    "state":1,
                    "number":"222"
                },
                {
                    "id":5,
                    "name":"John Brown",
                    "age":18,
                    "sex":"male",
                    "address":"New York No. 1 Lake Park",
                    "hobby":"电影",
                    "state":1,
                    "number":"666"
                },
                {
                    "id":6,
                    "name":"John Brown19",
                    "age":19,
                    "sex":"male",
                    "address":"New York No. 19 Lake Park",
                    "hobby":"电影",
                    "state":1,
                    "number":"668"
                },
                {
                    "id":7,
                    "name":"John Brown",
                    "age":27,
                    "sex":"male",
                    "address":"New York No. 7 Lake Park",
                    "hobby":"电影",
                    "state":1,
                    "number":"776"
                },
                {
                    "id":8,
                    "name":"John Brown",
                    "age":25,
                    "sex":"male",
                    "address":"New York No. 25 Lake Park",
                    "hobby":"电影",
                    "state":1,
                    "number":"123"
                },
                {
                    "id":9,
                    "name":"John Brown29",
                    "age":29,
                    "sex":"male",
                    "address":"New York No. 29 Lake Park",
                    "hobby":"电影",
                    "state":1,
                    "number":"666"
                },
                {
                    "id":10,
                    "name":"John Bro",
                    "age":16,
                    "sex":"male",
                    "address":"New York No. 16 Lake Park",
                    "hobby":"电影",
                    "state":1,
                    "number":"236"
                }
            ]
        }
    }

});
