Page({

  /**
   * 页面的初始数据
   */
  data: {
    urgImp: [],
    urgNimp: [],
    nurgImp: [],
    nurgNimp: []
  },

  // 点击象限进入对应的列表中
  enterList: function (e) {
    var number = e.currentTarget.dataset.number;
    var sNumber = wx.getStorageSync('number') || '';
    sNumber = number;
    wx.setStorageSync('number', sNumber);
    wx.switchTab({
      url: '../all/all',
    })
  },

  // 清除缓存
  clearAll: function () {
    var that = this;
    wx.showModal({
      content: '确定清楚全部日志吗？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('journals')
          that.setData({
            urgImp: [],
            urgNimp: [],
            nurgImp: [],
            nurgNimp: []
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  initData: function () {
    this.setData({
      journals: (wx.getStorageSync('journals') || [])
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
      urgImp: urgImp.slice(0, 4),
      urgNimp: urgNimp.slice(0, 4),
      nurgImp: nurgImp.slice(0, 4),
      nurgNimp: nurgNimp.slice(0, 4)
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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