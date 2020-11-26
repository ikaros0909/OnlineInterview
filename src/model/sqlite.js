import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import axios from 'axios';

import {
  // Android 라이브러리 < 갤러리에는 안나오는데 접근가능 : "/storage/emulated/0"
  ExternalStorageDirectoryPath,
  // 앱 파일 경로 < 핸드폰으로 직접 접근 불가 : "/data/user/0/com.jinhak.rms/files"
  DocumentDirectoryPath,
} from '../utils/iilliil/RN';

// const requestDB = () => {
// }

export const deleteDatabase = async (name, location) => {
  SQLite.deleteDatabase(
    { name, location: location || 'default' },
    () => {
      console.log('db 삭제 성공');
    },
    (error) => {
      console.log('db 삭제 실패', error);
    },
  );
};

export const openDatabase = async (name, location = 'default') => {
  // const modelsDir = `${ExternalStorageDirectoryPath}/Models`;
  // await RNFS.mkdir(modelsDir);
  // const result = await RNFS.readDir(`${DocumentDirectoryPath}`);
  try {
    const db = await SQLite.openDatabase(
      {
        name,
        location,
        // createFromLocation: `${modelsDir}/my.db`,  // 이미 만들어진 디비 이식할 때
      },
      () => console.log('[SUCESS] openDatabase'),
      (error) => console.log('[FAILURE] openDatabase', error.message),
    );
    return db;
  } catch (error) {
    return false;
  }
};

export const promiseQueries = async (db, queryGroup) => {
  return new Promise((resolve, reject) => {
    const response = [];
    db.transaction(
      (tx) => {
        for (const item of queryGroup) {
          let error_flag = false;
          const { query, args } = item;
          tx.executeSql(
            query,
            args,
            (tx, { rows }) => {
              for (let i = 0; i < rows.length; i++) {
                response.push(rows.item(i));
              }
            },
            (error) => {
              error_flag = true;
              // console.log(`[FAILURE] \nQuery: ${query} \nArgs: ${args}`, error);
            },
          );
          if (error_flag) break;
        }
      },
      (error) => reject(error),
      () => resolve(response),
    );
  });
};

export const promiseQuery = async (db, query, args) => {
  return new Promise((resolve, reject) => {
    const response = [];
    db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          args,
          (tx, { rows }) => {
            for (let i = 0; i < rows.length; i++) {
              response.push(rows.item(i));
            }
          },
          (error) => {
            //  console.log(`[FAILURE] \nQuery: ${query} \nArgs: ${args}`, error)
          },
        );
      },
      (error) => {
        reject(error);
      },
      () => resolve(response),
    );
  });
};
