package com.library.library.VO;

public class NoSeatReply {
    private int time_slot;
    private String message;
    public NoSeatReply(String message,int time_slot)
    {
        this.message = message;
        this.time_slot = time_slot;
    }

    public int getTime_slot() {
        return time_slot;
    }

    public String getMessage() {
        return message;
    }
}
