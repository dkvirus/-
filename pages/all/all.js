// pages/all/all.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urgImp: [],
    urgNimp: [],
    nurgImp: [],
    nurgNimp: [],
    number: ''
  },

  handleItem: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['修改日志', '完成任务'],
      success: function (res) {
        if (res.tapIndex === 0) {
          // 修改日志
          var journals = wx.getStorageSync('journals');
          var newJournals = journals.map(item => {
            if (item.id === id) {
              item.edit = true;
            }
            return item;
          });
          wx.setStorageSync('journals', newJournals);
          wx.switchTab({
            url: '../edit/edit'
          })
        } else {
          // 完成任务
          var journals = wx.getStorageSync('journals');
          var newJournals = journals.filter(item => item.id !== id);
          wx.setStorageSync('journals', newJournals);
          that.initData();
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
    this.initNumber();
  },

  initNumber: function () {
    var number = wx.getStorageSync('number') || '';
    this.setData({
      number: number
    });
    wx.setStorageSync('number', 'all')
  },

  initData: function () {
    this.setData({
      urgImp: [],
      urgNimp: [],
      nurgImp: [],
      nurgNimp: []
    });
    var journals = wx.getStorageSync('journals');
    var urgImp = [],
      urgNimp = [],
      nurgImp = [],
      nurgNimp = []
    for (var i = 0; i < journals.length; i++) {
      if (journals[i].isUrgent === true) {
        if (journals[i].isImportant === true) {
          this.data.urgImp.push(journals[i]);
          urgImp = this.data.urgImp;
        } else {
          this.data.urgNimp.push(journals[i]);
          urgNimp = this.data.urgNimp;
        }
      } else {
        if (journals[i].isImportant === true) {
          this.data.nurgImp.push(journals[i]);
          nurgImp = this.data.nurgImp;
        } else {
          this.data.nurgNimp.push(journals[i]);
          nurgNimp = this.data.nurgNimp;
        }
      }
    }
    this.setData({
      urgImp: urgImp,
      urgNimp: urgNimp,
      nurgImp: nurgImp,
      nurgNimp: nurgNimp
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})