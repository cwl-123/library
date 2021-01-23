package com.library.library.service.impl;

import com.library.library.VO.LeftNumReply;
import com.library.library.VO.NoSeatReply;
import com.library.library.VO.Result;
import com.library.library.VO.SeatReply;
import com.library.library.dao.MessageDao;
import com.library.library.dao.SeatDao;
import com.library.library.dao.UserDao;
import com.library.library.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("SeatService")
public class SeatSeviceImpl implements SeatService {

    @Autowired
    private MessageDao messageDao;

    @Autowired
    private SeatDao seatDao;

    @Autowired
    private UserDao userDao;

    @Override
    public Result getNumLeft(String seat_id, String area_name, String is_window, String is_plug, int time_slot) {
        int num = seatDao.getLeft(seat_id, area_name, is_window, is_plug, time_slot);
        LeftNumReply leftNumReply = new LeftNumReply(num,time_slot);
        return Result.OK().data(leftNumReply).build();
    }

    @Deprecated
    public Result postRequest(String unionid, String seat_id, int time_slot)
    {
        SeatReply seatrequest = new SeatReply(seat_id,time_slot);
        seatDao.postRqst(unionid,seat_id,time_slot);
        return Result.OK().data(seatrequest).build();
    }

    @Override
    public Result getOccupyTSlot(String seat_id) {
        int[] occupySlot = seatDao.getOTS(seat_id);
        return Result.OK().data(occupySlot).build();
    }

    @Override
    public Result confmSeat(String unionid, String seat_id,int time_slot) {
        int num = seatDao.checkSeatOccupy(unionid,seat_id,time_slot);
        if(num>0) {
            String message = "签到成功";
            seatDao.confirm(seat_id,time_slot);
            return Result.OK().data(message).build();
        }
        else
        {
            String message = "当前时间段您没有预约此座位";
            NoSeatReply noSeatReply = new NoSeatReply(message,time_slot);
            return Result.BAD().data(noSeatReply).build();
        }
    }

    private boolean checkOccupy(String unionid, int time_slot) {
        int res = seatDao.checkOccupy(unionid,time_slot);
        return res == 1;
    }

    @Override
    public Result dealRequest(String unionid, String seat_id, String area_name, String is_window, String is_plug, int time_slot) {
        if(checkOccupy(unionid,time_slot)) {
            String message = "该时间段已预约座位";
            NoSeatReply noSeatReply = new NoSeatReply(message,time_slot);
            return Result.BAD().data(noSeatReply).build();
        }
        if(seatDao.getLeft(seat_id,area_name,is_window,is_plug,time_slot)<1)
        {
            String message = "没有符合要求的座位";
            NoSeatReply noSeatReply = new NoSeatReply(message,time_slot);
            return Result.BAD().data(noSeatReply).build();
        }
        if(!seat_id.equals("%"))
        {
            seatDao.postRqst(unionid,seat_id,time_slot);
            SeatReply seatReply = new SeatReply(seat_id,time_slot);
            return Result.OK().data(seatReply).build();
        }
        else
        {
            String[] strings = seatDao.getSeatList(area_name,is_window,is_plug,time_slot);
            if(strings.length>0)
            {
                seat_id = strings[0];
                seatDao.postRqst(unionid,seat_id,time_slot);
                SeatReply seatReply = new SeatReply(seat_id,time_slot);
                return Result.OK().data(seatReply).build();
            }
            else
            {
                String message = "没有符合要求的座位";
                NoSeatReply noSeatReply = new NoSeatReply(message,time_slot);
                return Result.BAD().data(noSeatReply).build();
            }
        }
    }
}
