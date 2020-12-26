package com.library.library.controller;

import com.library.library.VO.Result;
import com.library.library.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping("/v1/seat")
public class SeatController  {
    @Autowired
    private SeatService seatService;
    @RequestMapping("/goodnight")
    public Result[] goodNight()
    {
        Result[] results = new Result[3];
        for(int i=0;i<3;i++)
            results[i] =  Result.BAD().build();
        return results;
    }
    @GetMapping("/left")
    @ResponseBody
    public Result getNumberOfSeatLeft(@RequestParam(value="seat_id",defaultValue="%")String seat_id,
                                      @RequestParam(value = "area_name", defaultValue = "%")String area_name,
                                      @RequestParam(value = "is_window", defaultValue = "%")String is_window,
                                      @RequestParam(value = "is_plug", defaultValue = "%")String is_plug,
                                      @RequestParam(value = "time_slot")int time_slot)
    {
        return seatService.getNumLeft(seat_id,area_name,is_window,is_plug,time_slot);
    }
    @PostMapping("/request")
    @ResponseBody
    public Result[] postSeatRequest(@RequestParam(value = "unionid")String unionid,
                                  @RequestParam(value = "seat_id", defaultValue = "%")String seat_id,
                                  @RequestParam(value = "area_name", defaultValue = "%")String area_name,
                                  @RequestParam(value = "is_window", defaultValue = "%")String is_window,
                                  @RequestParam(value = "is_plug", defaultValue = "%")String is_plug,
                                  @RequestParam("time_slot")int[] time_slot)
    {
        Result[] results = new Result[time_slot.length];
        for(int i=0;i<time_slot.length;i++)
        {
            results[i] = seatService.dealRequest(unionid,seat_id,area_name,is_window,is_plug,time_slot[i]);
        }
        return results;
    }
    @GetMapping("/occupy")
    @ResponseBody
    public Result getOccupyTimeSlot(@RequestParam("seat_id")String seat_id)
    {
        return seatService.getOccupyTSlot(seat_id);
    }
    @PostMapping("/confirm")
    @ResponseBody
    public Result confirmSeat(@RequestParam("unionid")String unionid,
                                @RequestParam("seat_id")String seat_id,
                              @RequestParam("time_slot")int time_slot)
    {
        return seatService.confmSeat(unionid,seat_id,time_slot);
    }
//    @Autowired
//    private BaseController baseController;

}