package com.library.library.pojo;

import lombok.Data;
import org.apache.ibatis.type.Alias;
@Data
@Alias("message")
public class Message {
    /*private String msg_id;
    private int status;
    private int version;
    private int eyes;*/
    private String unionid;
    private String seat_id;
    private int time_slot;
    private int is_confirm;

    public Message() {
    }

    public Message(String unionid, String seat_id, int time_slot, int is_confirm) {
        this.unionid = unionid;
        this.seat_id = seat_id;
        this.time_slot = time_slot;
        this.is_confirm = is_confirm;
    }
    /*private String msg_id;
    private JSONObject content;
    private int status;
    private int version;
    private int eyes;

    public Message() {
    }

    public Message(String msg_id, JSONObject content, int status, int version, int eyes) {
        this.msg_id = msg_id;
        this.content = content;
        this.status = status;
        this.version = version;
        this.eyes = eyes;
    }

    public String getMsg_id() {
        return this.msg_id;
    }

    public JSONObject getContent() {
        return this.content;
    }

    public int getStatus() {
        return this.status;
    }

    public int getVersion() {
        return this.version;
    }

    public int getEyes() {
        return this.eyes;
    }

    public void setMsg_id(final String msg_id) {
        this.msg_id = msg_id;
    }

    public void setContent(final JSONObject content) {
        this.content = content;
    }

    public void setStatus(final int status) {
        this.status = status;
    }

    public void setVersion(final int version) {
        this.version = version;
    }

    public void setEyes(final int eyes) {
        this.eyes = eyes;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof Message)) {
            return false;
        } else {
            Message other = (Message)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label47: {
                    Object this$msg_id = this.getMsg_id();
                    Object other$msg_id = other.getMsg_id();
                    if (this$msg_id == null) {
                        if (other$msg_id == null) {
                            break label47;
                        }
                    } else if (this$msg_id.equals(other$msg_id)) {
                        break label47;
                    }

                    return false;
                }

                Object this$content = this.getContent();
                Object other$content = other.getContent();
                if (this$content == null) {
                    if (other$content != null) {
                        return false;
                    }
                } else if (!this$content.equals(other$content)) {
                    return false;
                }

                if (this.getStatus() != other.getStatus()) {
                    return false;
                } else if (this.getVersion() != other.getVersion()) {
                    return false;
                } else if (this.getEyes() != other.getEyes()) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Message;
    }

    public int hashCode() {
        int PRIME = true;
        int result = 1;
        Object $msg_id = this.getMsg_id();
        int result = result * 59 + ($msg_id == null ? 43 : $msg_id.hashCode());
        Object $content = this.getContent();
        result = result * 59 + ($content == null ? 43 : $content.hashCode());
        result = result * 59 + this.getStatus();
        result = result * 59 + this.getVersion();
        result = result * 59 + this.getEyes();
        return result;
    }

    public String toString() {
        return "Message(msg_id=" + this.getMsg_id() + ", content=" + this.getContent() + ", status=" + this.getStatus() + ", version=" + this.getVersion() + ", eyes=" + this.getEyes() + ")";
    }*/

}
