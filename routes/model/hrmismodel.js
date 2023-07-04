exports.MasterUser = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      userid: key.mu_userid,
      fullname: key.mu_fullname,
      username: key.mu_username,
      password: key.mu_password,
      accesstype: key.mu_accesstype,
      roletype: key.mu_roletype,
      status: key.mu_status,
      createdby: key.mu_createdby,
      createddate: key.mu_createddate,
    });
  });

  return dataresult;
};

exports.MasterAccessType = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      accesscode: key.mat_accesscode,
      accessname: key.mat_accessname,
      status: key.mat_status,
      createdby: key.mat_createdby,
      createddate: key.mat_createddate,
    });
  });

  return dataresult;
};

exports.MasterRoleType = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      rolecode: key.mrt_rolecode,
      rolename: key.mrt_rolename,
      status: key.mrt_status,
      createdby: key.mrt_createdby,
      createddate: key.mrt_createddate,
    });
  });

  return dataresult;
};

exports.MasterPositionType = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      positioncode: key.mpt_positioncode,
      positionname: key.mpt_positionname,
      status: key.mpt_status,
      createdby: key.mpt_createdby,
      createddate: key.mpt_createddate,
    });
  });

  return dataresult;
};

exports.MasterDepartment = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      departmentcode: key.md_departmentcode,
      departmentname: key.md_departmentname,
      status: key.md_status,
      createdby: key.md_createdby,
      createddate: key.md_createddate,
    });
  });

  return dataresult;
};

exports.MasterIDType = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      idcode: key.mit_idcode,
      idname: key.mit_idname,
      status: key.mit_status,
      createdby: key.mit_createdby,
      createddate: key.mit_createddate,
    });
  });

  return dataresult;
};

exports.EmployeeDetails = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      employeeid: key.ed_employeeid,
      firstname: key.ed_firstname,
      middlename: key.ed_middlename,
      lastname: key.ed_lastname,
      gender: key.ed_gender,
      dateofbirth: key.ed_dateofbirth,
      address: key.ed_address,
      contactnumber: key.ed_cellphonenumber,
      email: key.ed_email,
      nationality: key.ed_nationality,
      maritalstatus: key.ed_maritalstatus,
      emergencycontactname: key.ed_emergencycontactname,
      emergencycontactnumber: key.ed_emergencycontactnumber,
      status: key.ed_status,
      createdby: key.ed_createdby,
      createddate: key.ed_createddate,
    });
  });

  return dataresult;
};

exports.EmployementDetails = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      employeeid: key.emd_employeeid,
      department: key.emd_department,
      dateofhire: key.emd_dateofhire,
      employmentstatus: key.emd_employmentstatus,
      salary: key.emd_salary,
      probationperiod: key.emd_probationperiod,
      performancereviewschedule: key.emd_performancereviewschedule,
      status: key.emd_status,
      createdby: key.emd_createdby,
      createddate: key.emd_createddate,
    });
  });

  return dataresult;
};

exports.EmployeeEducation = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      employeeid: key.ee_employeeid,
      degree: key.ee_degree,
      fieldofstudy: key.ee_fieldofstudy,
      institution: key.ee_institution,
      graduationdate: key.ee_graduationdate,
      status: key.ee_status,
      createdby: key.ee_createdby,
      createddate: key.ee_createddate,
    });
  });

  return dataresult;
};

exports.EmployeeWorkExperience = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      employeeid: key.ewe_employeeid,
      company: key.ewe_company,
      jobtitle: key.ewe_jobtitle,
      startdate: key.ewe_startdate,
      enddate: key.ewe_enddate,
      jobdescription: key.ewe_jobdescription,
      status: key.ewe_status,
      createdby: key.ewe_createdby,
      createddate: key.ewe_createddate,
    });
  });

  return dataresult;
};

exports.EmployeeReference = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      employeeid: key.er_employeeid,
      referencename: key.er_referencename,
      relationship: key.er_relationship,
      contactinfo: key.er_contactinfo,
      status: key.er_status,
      createdby: key.er_createdby,
      createddate: key.er_createddate,
    });
  });

  return dataresult;
};

exports.EmployeeGovernmentID = (data) => {
  let dataresult = [];

  data.forEach((key, item) => {
    dataresult.push({
      employeeid: key.egi_employeeid,
      sssid: key.egi_sssid,
      pagibigid: key.egi_pagibigid,
      philhealth: key.egi_philhealth,
      tinid: key.egi_tinid,
      status: key.egi_status,
      createdby: key.egi_createdby,
      createddate: key.egi_createddate,
    });
  });

  return dataresult;
};
