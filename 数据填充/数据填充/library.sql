
-- 这一行运行一次后注释掉
/*create database library*/

use library
DROP TABLE IF EXISTS sys_user;
create table sys_user
(
unionid varchar(30) primary key ,
mp_openid varchar(30),
nickname varchar(30),
avatar varchar(255),
sign varchar(255)
)


DROP TABLE IF EXISTS seat;
create table seat
(
seat_id varchar(30) primary key  ,
area_name varchar(30),
is_window int default 0,
is_plug int default 0
)

DROP TABLE IF EXISTS occupy;
create table occupy
(
unionid varchar(30) ,
seat_id varchar(30) ,
time_slot int default -1,
is_confirm int default 0,
primary key(unionid,seat_id,time_slot),
foreign key(unionid) references sys_user,
foreign key(seat_id) references seat
)


DROP TABLE IF EXISTS record;
create table record
(
unionid varchar(30) ,
seat_id varchar(30) ,
occ_date varchar(30) ,
time_slot int default -1,
is_confirm int default 0,
primary key(unionid,seat_id,occ_date,time_slot),
foreign key(unionid) references sys_user,
foreign key(seat_id) references seat
)

DROP TABLE IF EXISTS uer_state;
create table uer_state 
(
unionid varchar(30),
ban_date varchar(30),
primary key(unionid,ban_date),
foreign key(unionid) references sys_user,
)


DROP TABLE IF EXISTS favorites;
create table favorites 
(
unionid varchar(30),
seat_list text,
primary key(unionid),
foreign key(unionid) references sys_user,
)

