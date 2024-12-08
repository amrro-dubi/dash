import SelectComponent from '../../uitils/SelectComponent'
import React from 'react'

const AdvanceFiler = () => {
  return (
    <div className="modal adSearch-modal fade" id="adSearchModal01" tabIndex={-1} aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered">
    <div className="modal-content">
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x" /></button>
      <div className="modal-body">
        <form>
          <h5 className="main-title">Advanced Option</h5>
          <div className="row">
            <div className="col-md-12 mb-30">
              <div className="form-inner">
                <SelectComponent options={["Sydne City, Australia","Dhaka, Bangladesh","Tokyo, Japan"]} placeholder="Select"/>
              </div>
            </div>
            <h5>More Filter</h5>
            <div className="row mb-10">
              <div className="col-md-6 mb-20">
                <div className="form-inner">
                  <label>Select For</label>
                  <SelectComponent options={["Rent","Sale","Buy"]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-6 mb-20">
                <div className="form-inner">
                  <label>Property Type</label>
                  <SelectComponent options={["Health Care","Development","Industrial","Homw Town","Banglow","House"]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-6 mb-20">
                <div className="form-inner">
                  <label>Build Year</label>
                  <SelectComponent options={["2015","2016","2017","2018"]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-6 mb-20">
                <div className="form-inner">
                  <label>Condition</label>
                  <SelectComponent options={["Used","New",]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-6 mb-20">
                <div className="form-inner">
                  <label>Property Size</label>
                  <SelectComponent options={["1200sqf","1500sqf","2400sqf"]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-6 mb-20">
                <div className="form-inner">
                  <label>Number Of Room</label>
                  <SelectComponent options={["1","2","3","4"]} placeholder="Select"/>
                </div>
              </div>
            </div>
            <h5>Year &amp; Mileage</h5>
            <div className="row">
              <div className="col-md-6 mb-20">
                <div className="form-inner">
                  <label>Number Of Bath</label>
                  <SelectComponent options={["1","2","3","4"]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-3 mb-20">
                <div className="form-inner">
                  <label>Property Fece</label>
                  <SelectComponent options={["North","Souths","East","West"]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-3 mb-20">
                <div className="form-inner">
                  <label>Select Max (miles)</label>
                  <SelectComponent options={["1200 miles","3000 miles","3500 miles","4000 miles"]} placeholder="Select"/>
                </div>
              </div>
            </div>
            <h5 className="mb-20">Price Range</h5>
            <div className="row">
              <div className="col-lg-6 mb-20">
                <div className="range-wrapper2">
                  <div className="slider-wrapper">
                    <div id="eg-range-slider" />
                  </div> 
                  <div className="valus">
                    <div className="min-value">
                      <span>$</span>
                      <input type="text" className="from" defaultValue={200} />
                    </div>
                    <div className="min-value">
                      <span>$</span>
                      <input type="text" className="to" defaultValue={2000} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-20">
                <div className="form-inner">
                  <label>Min (Price)</label>
                  <SelectComponent options={["$12,234","$13,234","$14,234","$15,234"]} placeholder="Select"/>
                </div>
              </div>
              <div className="col-md-3 mb-20">
                <div className="form-inner">
                  <label>Max (Price)</label>
                  <SelectComponent options={["$12,234","$13,234","$14,234","$15,234"]} placeholder="Select"/>
                </div>
              </div>
            </div>
          </div>
          <div className="apply-btn pt-30">
            <button className="primary-btn2" type="submit">Apply Filter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default AdvanceFiler
