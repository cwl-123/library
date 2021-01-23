package com.library.library.pojo;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
@Data
public class MessageContentDto {
    /*private String source_id;
    private String device_name;
    private String message;
    private int type;
    private Timestamp occur_time;
    private String note;*/
    //library
    @Autowired
    private String unionid;
    private String seat_id;
    private int time_slot;
    private int if_confirm;
    public MessageContentDto() {
    }

    /*public String getSource_id() {
        return this.source_id;
    }

    public String getDevice_name() {
        return this.device_name;
    }

    public String getMessage() {
        return this.message;
    }

    public int getType() {
        return this.type;
    }

    public Timestamp getOccur_time() {
        return this.occur_time;
    }

    public String getNote() {
        return this.note;
    }

    public void setSource_id(final String source_id) {
        this.source_id = source_id;
    }

    public void setDevice_name(final String device_name) {
        this.device_name = device_name;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public void setType(final int type) {
        this.type = type;
    }

    public void setOccur_time(final Timestamp occur_time) {
        this.occur_time = occur_time;
    }

    public void setNote(final String note) {
        this.note = note;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof MessageContentDto)) {
            return false;
        } else {
            MessageContentDto other = (MessageContentDto)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label75: {
                    Object this$source_id = this.getSource_id();
                    Object other$source_id = other.getSource_id();
                    if (this$source_id == null) {
                        if (other$source_id == null) {
                            break label75;
                        }
                    } else if (this$source_id.equals(other$source_id)) {
                        break label75;
                    }

                    return false;
                }

                Object this$device_name = this.getDevice_name();
                Object other$device_name = other.getDevice_name();
                if (this$device_name == null) {
                    if (other$device_name != null) {
                        return false;
                    }
                } else if (!this$device_name.equals(other$device_name)) {
                    return false;
                }

                Object this$message = this.getMessage();
                Object other$message = other.getMessage();
                if (this$message == null) {
                    if (other$message != null) {
                        return false;
                    }
                } else if (!this$message.equals(other$message)) {
                    return false;
                }

                if (this.getType() != other.getType()) {
                    return false;
                } else {
                    Object this$occur_time = this.getOccur_time();
                    Object other$occur_time = other.getOccur_time();
                    if (this$occur_time == null) {
                        if (other$occur_time != null) {
                            return false;
                        }
                    } else if (!this$occur_time.equals(other$occur_time)) {
                        return false;
                    }

                    Object this$note = this.getNote();
                    Object other$note = other.getNote();
                    if (this$note == null) {
                        if (other$note != null) {
                            return false;
                        }
                    } else if (!this$note.equals(other$note)) {
                        return false;
                    }

                    return true;
                }
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof MessageContentDto;
    }

    public int hashCode() {
        int PRIME = true;
        int result = 1;
        Object $source_id = this.getSource_id();
        int result = result * 59 + ($source_id == null ? 43 : $source_id.hashCode());
        Object $device_name = this.getDevice_name();
        result = result * 59 + ($device_name == null ? 43 : $device_name.hashCode());
        Object $message = this.getMessage();
        result = result * 59 + ($message == null ? 43 : $message.hashCode());
        result = result * 59 + this.getType();
        Object $occur_time = this.getOccur_time();
        result = result * 59 + ($occur_time == null ? 43 : $occur_time.hashCode());
        Object $note = this.getNote();
        result = result * 59 + ($note == null ? 43 : $note.hashCode());
        return result;
    }

    public String toString() {
        return "MessageContentDto(source_id=" + this.getSource_id() + ", device_name=" + this.getDevice_name() + ", message=" + this.getMessage() + ", type=" + this.getType() + ", occur_time=" + this.getOccur_time() + ", note=" + this.getNote() + ")";
    }*/
}
