// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    journal: {
      isUrgent: true,
      isImportant: true,
      content: ''
    }
  },

  /**
   * 绑定 是否紧急 数据
   */
  handleUrgent: function (e) {
    this.data.journal.isUrgent = e.detail.value;
    var newJournal = this.data.journal;
    this.setData({
      journal: newJournal
    });
  },

  /**
   * 绑定 是否重要 数据
   */
  handleImportant: function (e) {
    this.data.journal.isImportant = e.detail.value;
    var newJournal = this.data.journal;
    this.setData({
      journal: newJournal
    });
  },

  /**
   * 绑定文本框数据
   */
  handleContent: function (e) {
    this.data.journal.content = e.detail.value;
    var newJournal = this.data.journal;
    this.setData({
      journal: newJournal
    });
  },

  /**
   * 确定按钮触发事件
   */
  handleSubmit: function () {
    var journals = wx.getStorageSync('journals');
    if (journals === '') {
      journals = [];
    }
    journals.push(this.data.journal);
    wx.setStorageSync('journals', journals);
    wx.navigateTo({
      url: '../all/all'
    });
  },

})