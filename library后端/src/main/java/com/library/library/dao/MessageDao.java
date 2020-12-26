package com.library.library.dao;
import com.library.library.pojo.*;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import com.library.library.VO.Result;
import com.library.library.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Repository
public interface MessageDao
{
    List<String> getMessageList(@RequestParam("unionid") String unionid);

    List<com.library.library.pojo.Message>getMessageLst(@RequestParam("unionid")String unionid);
    List<String> getExtraMessage(@RequestParam("seat_id")String seat_id);
    List<SeatExtra>getExMsg(@RequestParam("seat_id")String seat_id);
    void cancle(@RequestParam("seat_id")String seat_id,
                @RequestParam("unionid")String unionid,
                @RequestParam("time_slot")int time_slot);


    String checkCollection(@RequestParam("unionid")String unionid);

    Message getMessage(@RequestParam("msg_id")String msg_id);

    Object getMessageContentDto(@RequestParam("msg_id")String msg_id);

    void addCollection(@RequestParam("unionid")String unionid,
                       @RequestParam("seat_list")String seat_list);
    void addOcu(@RequestParam("seat_id")String seat_id,
                @RequestParam("area_name")String area_name,
                @RequestParam("is_window")int is_window,
                @RequestParam("is_plug")int is_plug);
    void deleteCollection(@RequestParam("unionid")String unionid,
                          @RequestParam("seat_list")String seat_list);
    void del();
}
/*package com.library.library.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageDao  {


}
*/