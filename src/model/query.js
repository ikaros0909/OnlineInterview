export const CREATE_QUERY = {
    tbRecordStuSet: `
    CREATE TABLE IF NOT EXISTS tbRecordStuSet (
      NEISCode TEXT NOT NULL,
      IpsiYear TEXT NOT NULL,
      IpsiGubun TEXT NOT NULL,
      ExamSetNo TEXT NOT NULL,
      SuhumNo TEXT NOT NULL,
      ExamHallCode TEXT NOT NULL,
      VrNo TEXT NULL,
      -- tbStu 학생정보
      MajorCode TEXT NULL,
      MajorName TEXT NULL,
      SelTypeCode TEXT NULL,
      SelTypeName TEXT NULL,
      StuName TEXT NULL,
      StuBirth TEXT NULL,
      FileName TEXT NULL,
      Extension TEXT NULL,
      PRIMARY KEY (NEISCode, IpsiYear, IpsiGubun, ExamSetNo, SuhumNo, ExamHallCode)
    ) WITHOUT ROWID;
     `,
  
    tbRecordStuSetResult: `
    CREATE TABLE IF NOT EXISTS tbRecordStuSetResult (
      NEISCode TEXT NOT NULL,
      IpsiYear TEXT NOT NULL,
      IpsiGubun TEXT NOT NULL,
      ExamSetNo TEXT NOT NULL,
      SuhumNo TEXT NOT NULL,
      ExamHallCode TEXT NULL,
      EvalStatus NOT NULL,
      EvalTime TEXT NULL,
      RecordFilename TEXT NULL,
      Duration INTEGER NULL,
      LocalUri TEXT NULL,
      isFinalCommit NOT NULL,
      PRIMARY KEY (NEISCode, IpsiYear, IpsiGubun, ExamSetNo, SuhumNo)
    ) WITHOUT ROWID
     `,
  };
  
  export const DROP_QUERY = {
    tbRecordStuSet: `
      DROP TABLE tbRecordStuSet
    `,
  };
  
  export const SELECT_QUERY = {
    tbRecordStuSet: `
    SELECT NEISCode, IpsiYear, IpsiGubun, ExamSetNo, ExamHallCode, SuhumNo
      , VrNo
      , SelTypeCode, SelTypeName
      , MajorCode, MajorName
      , StuName, StuBirth
      , FileName, Extension
    FROM tbRecordStuSet
    WHERE NEISCode = ?
      AND IpsiYear = ?
      AND IpsiGubun = ?
      AND ExamSetNo = ?
      AND ExamHallCode = ?
     `,
  
    tbRecordStuSetResult: `
    SELECT NEISCode, IpsiYear, IpsiGubun, ExamSetNo, SuhumNo
      , ExamHallCode, EvalStatus, EvalTime, RecordFilename, Duration, LocalUri, isFinalCommit
    FROM tbRecordStuSetResult
    WHERE NEISCode = ?
      AND IpsiYear = ?
      AND IpsiGubun = ?
      AND ExamSetNo = ?
     `,
  
    selectLocalJoin: `
     SELECT RS.NEISCode, RS.IpsiYear, RS.IpsiGubun, RS.ExamSetNo, RS.SuhumNo
      , MAX(RS.VrNo) AS VrNo
      , MAX(RS.SelTypeCode) AS SelTypeCode
      , MAX(RS.SelTypeName) AS SelTypeName
      , MAX(RS.MajorCode) AS MajorCode
      , MAX(RS.MajorName) AS MajorName
      , MAX(RS.StuName) AS StuName
      , MAX(RS.StuBirth) AS StuBirth
      , MAX(RS.FileName) AS FileName
      , MAX(RS.Extension) AS Extension
      ---- 녹화고사 결과
      -- , MAX(RSR.ExamHallCode) AS ExamHallCode
      , MAX(IFNULL(RSR.EvalStatus, 0)) AS EvalStatus
      , MAX(RSR.EvalTime) AS EvalTime
      , MAX(RSR.RecordFilename) AS RecordFilename
      , MAX(RSR.LocalUri) AS LocalUri
      , MAX(IFNULL(RSR.isFinalCommit, '0')) AS isFinalCommit
    FROM tbRecordStuSet RS
    LEFT JOIN tbRecordStuSetResult RSR
      ON RS.NEISCode = RSR.NEISCode
      AND RS.IpsiYear = RSR.IpsiYear
      AND RS.IpsiGubun = RSR.IpsiGubun
    AND RS.ExamSetNo = RSR.ExamSetNo
      AND RS.SuhumNo = RSR.SuhumNo
    WHERE RS.NEISCode = ?
      AND RS.IpsiYear = ?
      AND RS.IpsiGubun = ?
      AND RS.ExamSetNo = ?
      #WHERE_QUERY#
    GROUP BY RS.NEISCode, RS.IpsiYear, RS.IpsiGubun, RS.ExamSetNo, RS.SuhumNo 
    ORDER BY RS.ExamSetNo ASC, RS.SuhumNo ASC
     `,
  };
  
  export const DELETE_QUERY = {
    tbRecordStuSet: `
      DELETE FROM tbRecordStuSet
      WHERE NEISCode = ?
        AND IpsiYear = ?
        AND IpsiGubun = ?
        AND ExamSetNo = ?
        AND ExamHallCode = ?
      `,
  
    tbRecordStuSetResult: `
      DELETE FROM tbRecordStuSetResult
      WHERE NEISCode = ?
        AND IpsiYear = ?
        AND IpsiGubun = ?
        AND ExamSetNo = ?
      `,
  };
  
  export const INSERT_QUERY = {
    tbRecordStuSet: `
    INSERT INTO tbRecordStuSet (
      NEISCode, IpsiYear, IpsiGubun, ExamSetNo, SuhumNo, ExamHallCode
      , VrNo
      , SelTypeCode, SelTypeName
      , MajorCode, MajorName
      , StuName, StuBirth
      , FileName, Extension
    )
    VALUES (
      ?, ?, ?, ?, ?, ?
      , ?
      , ?, ?
      , ?, ?
      , ?, ?
      , ?, ?
    )
    `,
  
    tbRecordStuSetResult: `
    INSERT INTO tbRecordStuSetResult (
        NEISCode, IpsiYear, IpsiGubun, ExamSetNo, SuhumNo
      , ExamHallCode
      , EvalStatus, EvalTime, RecordFilename, Duration, LocalUri, isFinalCommit
    )
    VALUES (
      ?, ?, ?, ?, ?
      , ?
      , ?, ?, ?, ?, ?, ?
    )
    `,
  };
  
  export const UPDATE_QUERY = {
    tbRecordStuSetResult_recordFilename: `
    UPDATE tbRecordStuSetResult
    SET ExamHallCode = ?
      , EvalTime = ?
      , EvalStatus = ?
      , RecordFilename = ?
    WHERE NEISCode = ?
      AND IpsiYear = ?
      AND IpsiGubun = ?
      AND ExamSetNo = ?
      AND SuhumNo = ?
    `,
  
    tbRecordStuSetResult_Duration_LocalUri: `
    UPDATE tbRecordStuSetResult
    SET ExamHallCode = ?
      , Duration = ?
      , LocalUri = ?
    WHERE NEISCode = ?
      AND IpsiYear = ?
      AND IpsiGubun = ?
      AND ExamSetNo = ?
      AND SuhumNo = ?
    `,
  
    tbRecordStuSetResult_EvalStatus: `
    UPDATE tbRecordStuSetResult
    SET ExamHallCode = ?
      , EvalTime = ?
      , EvalStatus = ?
      , RecordFilename = CASE
          WHEN ? IN (-1, -2) THEN NULL
          ELSE RecordFilename
        END
      , Duration = CASE
          WHEN ? IN (-1, -2) THEN NULL
          ELSE Duration
        END
      , LocalUri = CASE
          WHEN ? IN (-1, -2) THEN NULL
          ELSE LocalUri
        END
      WHERE NEISCode = ?
        AND IpsiYear = ?
        AND IpsiGubun = ?
        AND ExamSetNo = ?
        AND SuhumNo = ?
    `,
  
    tbRecordStuSetResult_recordFail: `
    UPDATE tbRecordStuSetResult
    SET ExamHallCode = ?
      , EvalTime = ?
      , EvalStatus = ?
    WHERE NEISCode = ?
      AND IpsiYear = ?
      AND IpsiGubun = ?
      AND ExamSetNo = ?
      AND SuhumNo = ?
    `,
  
    tbRecordStuSetResult_isFinalCommit: `
    UPDATE tbRecordStuSetResult
    SET ExamHallCode = ?
      , EvalTime = ?
      , isFinalCommit = ?
    WHERE NEISCode = ?
      AND IpsiYear = ?
      AND IpsiGubun = ?
      AND ExamSetNo = ?
      AND SuhumNo = ?
    `,
  };
  