require 'csv'

class CsvData
  attr_accessor :failed

  def initialize(dir, file)
    @data = CSV.read(Rails.root.join(dir, file), headers: true)
  end

  def days
    @data.each do |row|
      row['created_on'] = row['created_at'].split(' ').first
    end

    @days = @data.map { |row| row['created_on'] }.uniq.sort.map(&:to_s)
  end

  def times
    @times = @data.map { |row| row['created_at'] }.sort.map(&:to_s)
  end

  def passing
    passing = Hash.new(0)

    @data.each do |row|
      passing[row['created_on']] += 1 if row['summary_status'] == 'passed'
    end

    passing.values_at(*@days)
  end

  def failing
    @failed = Hash.new(0)

    @data.each do |row|
      @failed[row['created_on']] += 1 if row['summary_status'] != 'passed'
    end

    @failed.values_at(*@days)
  end

  def duration
    duration = Hash.new(0)

    @data.each do |row|
      duration[row['created_at']] = row['duration'].to_f
    end

    duration.values_at(*@times)
  end

  def abnormal_days
    fails = self.failing

    av = fails.sum.to_f / fails.count
    sum = fails.inject(0) { |sum, x| sum + (x - av) ** 2 }
    d = Math::sqrt(sum / (fails.sum + self.passing.sum))

    ab_days = @failed.select { |k, v| v > av + 3 * d }.keys
    ab_days.map { |x| @days.index(x) }
  end
end
