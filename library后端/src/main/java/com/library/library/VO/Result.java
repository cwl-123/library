package com.library.library.VO;


public class Result {
    private int status;
    private String msg;
    private Object data;
    public Result (int status, String msg)
    {
        this.status = status;
        this.msg = msg;
    }
    public Result(int status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }
    public int getStatus() {
        return status;
    }
    public String getMsg() {
        return msg;
    }
    public Object getData() {
        return data;
    }

    /**
     * 建议用ResultBuilder的build方法来生成Result
     * 这样Result的状态能够维持一致性：
     * --> 要么没有Result，
     * --> 要么Result的状态是不可改变的 immutable
     * 可以用 {@code Result.OK().msg("success").response(response).build();} 的流式API方式来构建Result
     */
    public static class ResultBuilder
    {
        private int status;
        private String msg;
        private Object data;
        public ResultBuilder(int status, String msg) {
            this.status = status;
            this.msg = msg;
        }
        public ResultBuilder msg(String msg) {
            this.msg = msg;
            return this;
        }
        public ResultBuilder data(Object data) {
            this.data = data;
            return this;
        }
        public Result build() {
            return new Result(status, msg, data);
        }
        public int getStatus()
        {
            return status;
        }
        public String getMsg()
        {
            return msg;
        }
        public Object getData()
        {
            return data;
        }
    }
    public static ResultBuilder OK() {return new ResultBuilder(200, "success");};
    public static ResultBuilder BAD() {
        return new ResultBuilder(400, "failure");
    }

}

