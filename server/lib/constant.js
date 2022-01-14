const MASS = {
  heightCondition: 6, // Trạng thái chiều cao
  weightCondition: 6, // Trạng thái cân nặng
  eyesight: 4,        // Thị lực
  absorption: 6,      // Khả năng hấp thụ
  eatingLevel: 6,     // Mức độ ăn
  kindergarten: 2,    // Đi nhà trẻ
  strength: 5,        // Sức đề kháng
  bodyMovement: 4     // Mức độ vận động
}

const SIMILARTITY = {
  heightCondition: { // Trạng thái chiều cao
    cao: {
      cao: 1,
      binh_thuong: 0.7,
      thap: 0,
    },
    binh_thuong: {
      cao: 0.7,
      binh_thuong: 1,
      thap: 0.4,
    },
    thap: {
      cao: 0,
      binh_thuong: 0.4,
      thap: 1,
    },
  },
  weightCondition: { // Trạng thái cân nặng
    thieu_can: {
      thieu_can: 1,
      nguy_co_thieu_can: 0.8,
      binh_thuong: 0.3,
      nguy_co_thua_can: 0.1,
      thua_can: 0,
    },
    nguy_co_thieu_can: {
      thieu_can: 0.8,
      nguy_co_thieu_can: 1,
      binh_thuong: 0.5,
      nguy_co_thua_can: 0.2,
      thua_can: 0.1
    },
    binh_thuong: {
      thieu_can: 0.3,
      nguy_co_thieu_can: 0.5,
      binh_thuong: 1,
      nguy_co_thua_can: 0.5,
      thua_can: 0.3
    },
    nguy_co_thua_can: {
      thieu_can: 0.1,
      nguy_co_thieu_can: 0.2,
      binh_thuong: 0.5,
      nguy_co_thua_can: 1,
      thua_can: 0.8
    },
    thua_can: {
      thieu_can: 0,
      nguy_co_thieu_can: 0.1,
      binh_thuong: 0.3,
      nguy_co_thua_can: 0.8,
      thua_can: 1
    }
  },
  eyesight: {        // Thị lực
    binh_thuong: {
      binh_thuong: 1,
      kem: 0,
    },
    kem: {
      binh_thuong: 0,
      kem: 1,
    }
  },
  absorption: {      // Khả năng hấp thụ
    tot: {
      tot: 1,
      binh_thuong: 0.6,
      kem: 0,
    },
    binh_thuong: {
      tot: 0.6,
      binh_thuong: 1,
      kem: 0.2,
    },
    kem: {
      tot: 0,
      binh_thuong: 0.2,
      kem: 1
    }
  },
  eatingLevel: {     // Mức độ ăn
    nhieu: {
      nhieu: 1,
      binh_thuong: 0.6,
      bieng_an: 0
    },
    binh_thuong: {
      nhieu: 0.6,
      binh_thuong: 1,
      bieng_an: 0.3
    },
    bieng_an: {
      nhieu: 0,
      binh_thuong: 0.3,
      bieng_an: 1
    }
  },
  kindergarten: {    // Đi nhà trẻ
    co: {
      co: 1,
      khong: 0 
    },
    khong: {
      co: 0,
      khong: 1
    }
  },
  strength: {        // Sức đề kháng
    cao: {
      cao: 1,
      binh_thuong: 0.7,
      thap: 0
    },
    binh_thuong: {
      cao: 0.7,
      binh_thuong: 1,
      thap: 0.4
    },
    thap: {
      cao: 0,
      binh_thuong: 0.4,
      thap: 1,
    }
  },
  bodyMovement: {     // Mức độ vận động
    cao: {
      cao: 1,
      binh_thuong: 0.5,
      thap: 0
    },
    binh_thuong: {
      cao: 0.5,
      binh_thuong: 1,
      thap: 0.5
    }, 
    thap: {
      cao: 0,
      binh_thuong: 0.5,
      thap: 1
    }
  }
}

const WEIGHT_CONDITION = [
  { value: "thieu_can", name: "Thiếu cân"},
  { value: "nguy_co_thieu_can", name: "Nguy cơ thiếu cân"},
  { value: "binh_thuong", name: "Bình thường"},
  { value: "nguy_co_thua_can", name: "Nguy cơ thừa cân"},
  { value: "thua_can", name: "Thừa cân"},
];

const HEIGHT_CONDITON = [
  { value: "thap", name: "Thấp" },
  { value: "binh_thuong", name: "Cao" },
  { value: "cao", name: "Cao" },
]

module.exports = {
  MASS,
  SIMILARTITY,
  WEIGHT_CONDITION,
  HEIGHT_CONDITON,
}