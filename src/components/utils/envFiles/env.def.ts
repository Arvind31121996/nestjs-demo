export interface Config {
	http?: any;
}

export const def: Config = {
	http: {
	server_timeout : process.env.SERVER_TIMEOUT,
    server_port : process.env.SERVER_PORT,
    db_host : process.env.DATABASE_HOST,
    db_port : process.env.DATABASE_PORT,
    db_username : process.env.DATABASE_USERNAME,
    db_password : process.env.DATABASE_PASSWORD,
    db_name : process.env.DATABASE_NAME,
    db_type : process.env.DATABASE_TYPE,
    db_connection_timeout : process.env.DATABASE_CONNECTION_TIME_OUT,
    db_acquire_time_out : process.env.DATABASE_ACQUIRE_TIME_OUT,
    db_connection_limit : process.env.DATABASE_CONNECTION_LIMIT,
    secretkey : process.env.SECRETKEY,
    expiresin : process.env.EXPIRESIN,
    log_folder : process.env.LOG_FOLDER,
    log_file : process.env.LOG_FILE,
    log_level : process.env.LOG_LEVEL,
    log_frequency : process.env.LOG_FREQUENCY,
    log_max_size : process.env.LOG_MAX_SIZE,
    log_max_files : process.env.LOG_MAX_FILES,
    log_file_enable : process.env.LOG_FILE_ENABLE,
    log_console_enable : process.env.LOG_CONSOLE_ENABLE,
    from_email : process.env.FROM_EMAIL,
    email_id : process.env.EMAIL_ID,
    email_pass : process.env.EMAIL_PASS,
    email_port : process.env.EMAIL_PORT,
    google_client_id : process.env.GOOGLE_CLIENT_ID,
    google_secret : process.env.GOOGLE_SECRET,
    redis_host : process.env.REDIS_HOST,
    redis_port : process.env.REDIS_PORT
	}
};