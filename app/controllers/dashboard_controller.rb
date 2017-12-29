class DashboardController < ApplicationController

  def index
    data = CsvData.new('data', 'session_history.csv')
    gon.days = data.days
    gon.passing = data.passing
    gon.failing = data.failing
    gon.times = data.times
    gon.duration = data.duration
  end
end
