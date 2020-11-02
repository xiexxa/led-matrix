drop table if exists text_histories;

-- /text のメインテキストボックスの入力履歴
create table text_histories (id int not null primary key auto_increment, body varchar(10000), created_at datetime, updated_at datetime);
-- /text/phraseの定型文
create table phrases (id int not null primary key auto_increment, body varchar(10000) not null, created_at datetime, updated_at datetime);