package com.library.library.VO;

public class LeftNumReply {
    private int num;
    private int time_slot;
    public LeftNumReply(int num,int time_slot)
    {
        this.num = num;
        this.time_slot = time_slot;
    }

    public int getNum() {
        return num;
    }
    public int getTime_slot() {
        return time_slot;
    }
}
