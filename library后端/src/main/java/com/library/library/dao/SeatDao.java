package com.library.library.dao;

import org.springframework.stereotype.Repository;


@Repository
public interface SeatDao {
    int getLeft(String seat_id, String area_name, String is_window, String is_plug, int time_slot);

    void postRqst(String unionid, String seat_id, int time_slot);

    int[] getOTS(String seat_id);

    void confirm(String seat_id, int time_slot);

    int checkOccupy(String unionid, int time_slot);

    String[] getSeatList(String area_name, String is_window, String is_plug, int time_slot);

    int checkSeatOccupy(String unionid, String seat_id, int time_slot);
}
