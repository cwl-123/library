package com.library.library.service;

import com.library.library.VO.Result;

public interface SeatService {
    Result getNumLeft(String seat_id, String area_name, String is_window, String is_plug, int time_slot);

    @Deprecated
    Result postRequest(String unionid, String seat_id, int time_slot);

    Result getOccupyTSlot(String seat_id);

    Result confmSeat(String unionid, String seat_id,int time_slot);

    Result dealRequest(String unionid, String seat_id, String area_name, String is_window, String is_plug, int time_slot);
}
