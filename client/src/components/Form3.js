import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

function Form(props) {
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);



    const [a, setA] = useState('1');


    const handleChange = (e) => {
        console.log(e.target.value);
    }
    return (
        <div className="container">
            <div className="row justify-content-md-center">
            {!show2&&<form className="border border-primary rounded w-50" style={{marginTop: '100px'}}>
            <h2 className="text-center">Form thông tin</h2>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Tuổi</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputEmail3" placeholder="tháng"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Chiều cao</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputPassword3" placeholder="cm"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Cân nặng</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputPassword3" placeholder="kg"/>
                    </div>
                </div>
                
            <fieldset class="form-group">
                <div class="row">
                    <legend class="col-form-label col-sm-2 pt-0">Giới tính</legend>
                    <div class="col-sm-10">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                        <label class="form-check-label text-start" for="gridRadios1">Nam</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                        <label class="form-check-label" for="gridRadios2">Nữ</label>
                    </div>
                    </div>
                    </div>
            </fieldset>
            <div class="form-group row">
                <div class="col-sm-10">
                <button type="submit" class="btn btn-primary text-align-center" onClick={() =>
                setShow2(true)}>Submit</button>
            </div>
        </div>
    </form>}
    {show2&&<form className="border border-primary rounded w-50" style={{marginTop: '100px'}}>
        <h2 className="text-center">Form thông tin</h2>
        <div className="form-group row">
            <p className="col-3">Thị lực:</p>
            <div class="col-3 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" onChange={handleChange}/>
                <label class="form-check-label" for="inlineRadio1">Bình thường</label>
            </div>
            <div class="col-3 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" onChange={handleChange}/>
                <label class="form-check-label" for="inlineRadio2">Kém</label>
            </div>
        </div>

        <div className="form-group row">
            <p className="col-3">Khả năng hấp thụ:</p>
            <div class="col-2 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1"/>
                <label class="form-check-label" for="inlineRadio2">Tốt</label>
            </div>
            <div class="col-3 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="optio4"/>
                <label class="form-check-label" for="inlineRadio2">Bình thường</label>
            </div>
            <div class="col-2 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="optio5"/>
                <label class="form-check-label" for="inlineRadio2">Kém</label>
            </div>
        </div>

        <div className="form-group row">
            <p className="col-3">Mức độ ăn:</p>
            <div class="col-2 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label class="form-check-label" for="inlineRadio1">Nhiều</label>
            </div>
            <div class="col-3 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                <label class="form-check-label" for="inlineRadio2">Bình thường</label>
            </div>
            <div class="col-3 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
                <label class="form-check-label" for="inlineRadio2">Biếng ăn</label>
            </div>
        </div>

        <div className="form-group row">
            <p className="col-3">Đi nhà trẻ:</p>
            <div class="col-3 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label class="form-check-label" for="inlineRadio1">Có</label>
            </div>
            <div class="col-3 form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                <label class="form-check-label" for="inlineRadio2">Không</label>
            </div>
        </div>
        <button type="submit" class="btn btn-primary text-align-center" onClick={() => 
                setShow1(false)}>Submit</button>
        </form>}
    </div>
</div>
    )
}

export default Form;