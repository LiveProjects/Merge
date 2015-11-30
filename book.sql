/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : book

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-11-30 14:35:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pinglun
-- ----------------------------
DROP TABLE IF EXISTS `pinglun`;
CREATE TABLE `pinglun` (
  `FID` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `pingluncon` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `dishname` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pinglun
-- ----------------------------
INSERT INTO `pinglun` VALUES ('8', 'lio', '按时大大', '苦瓜');
INSERT INTO `pinglun` VALUES ('9', 'lio', '菜', '西红柿炒鸡蛋');
INSERT INTO `pinglun` VALUES ('10', 'lio', '爱迪生打完', '苦瓜');
INSERT INTO `pinglun` VALUES ('11', 'lio', 'a', '苦瓜');
INSERT INTO `pinglun` VALUES ('12', 'lio', 'bbbbb', '苦瓜');
INSERT INTO `pinglun` VALUES ('13', 'lio', 'ssdadawa w', '苦瓜');
INSERT INTO `pinglun` VALUES ('14', '', 'hsan', '苦瓜');
INSERT INTO `pinglun` VALUES ('15', 'lio', 'ooo', '苦瓜');
INSERT INTO `pinglun` VALUES ('16', 'lio', 'asdasd', '苦瓜');

-- ----------------------------
-- Table structure for t_hs_busline
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_busline`;
CREATE TABLE `t_hs_busline` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FName` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FType` int(4) DEFAULT NULL,
  `FRemark` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_busline
-- ----------------------------
INSERT INTO `t_hs_busline` VALUES ('1', '工作日常规班车1线', '1', '');
INSERT INTO `t_hs_busline` VALUES ('2', '工作日常规班车2线', '1', null);
INSERT INTO `t_hs_busline` VALUES ('3', '工作日常规班车3线', '1', null);
INSERT INTO `t_hs_busline` VALUES ('4', '工作日常规班车4线', '1', null);
INSERT INTO `t_hs_busline` VALUES ('5', '工作日常规班车5线', '1', null);
INSERT INTO `t_hs_busline` VALUES ('6', '工作日常规班车6线', '1', null);
INSERT INTO `t_hs_busline` VALUES ('7', '工作日加班班车1线', '2', '滨海大道、金水路、黑龙江路、福州路、宁夏路、江西路');
INSERT INTO `t_hs_busline` VALUES ('8', '工作日加班班车2线', '2', '滨海大道、金水路、重庆中路、温州路、长春路');
INSERT INTO `t_hs_busline` VALUES ('9', '工作日加班班车3线', '2', '滨海大道、金水路、黑龙江路、海尔路、辽阳路、劲松三路 、江西路');
INSERT INTO `t_hs_busline` VALUES ('10', '周末加班班车1线', '3', null);

-- ----------------------------
-- Table structure for t_hs_busline_stop
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_busline_stop`;
CREATE TABLE `t_hs_busline_stop` (
  `FBusID` int(4) DEFAULT NULL,
  `FStopID` int(4) DEFAULT NULL,
  `FSeq` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_busline_stop
-- ----------------------------
INSERT INTO `t_hs_busline_stop` VALUES ('1', '11', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('2', '25', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('3', '26', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('4', '18', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('5', '19', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('6', '27', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '1', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '2', '2');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '3', '3');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '4', '4');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '5', '5');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '6', '6');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '8', '8');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '7', '7');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '9', '9');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '10', '10');
INSERT INTO `t_hs_busline_stop` VALUES ('7', '11', '11');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '1', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '12', '2');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '13', '3');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '14', '4');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '15', '5');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '16', '6');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '17', '7');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '18', '8');
INSERT INTO `t_hs_busline_stop` VALUES ('8', '19', '9');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '1', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '20', '2');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '2', '3');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '21', '4');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '22', '5');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '23', '6');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '24', '7');
INSERT INTO `t_hs_busline_stop` VALUES ('9', '11', '8');
INSERT INTO `t_hs_busline_stop` VALUES ('10', '11', '1');
INSERT INTO `t_hs_busline_stop` VALUES ('10', '26', '2');
INSERT INTO `t_hs_busline_stop` VALUES ('10', '28', '3');
INSERT INTO `t_hs_busline_stop` VALUES ('10', '29', '4');
INSERT INTO `t_hs_busline_stop` VALUES ('10', '1', '5');

-- ----------------------------
-- Table structure for t_hs_bustime
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_bustime`;
CREATE TABLE `t_hs_bustime` (
  `FBusID` int(4) DEFAULT NULL,
  `FTime` varchar(80) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_bustime
-- ----------------------------
INSERT INTO `t_hs_bustime` VALUES ('1', '7:30');
INSERT INTO `t_hs_bustime` VALUES ('2', '7:50');
INSERT INTO `t_hs_bustime` VALUES ('3', '7:40');
INSERT INTO `t_hs_bustime` VALUES ('4', '7:30');
INSERT INTO `t_hs_bustime` VALUES ('5', '7:30');
INSERT INTO `t_hs_bustime` VALUES ('6', '8:00');
INSERT INTO `t_hs_bustime` VALUES ('7', '19：00');
INSERT INTO `t_hs_bustime` VALUES ('7', '19：40');
INSERT INTO `t_hs_bustime` VALUES ('7', '20：10');
INSERT INTO `t_hs_bustime` VALUES ('7', '20：50');
INSERT INTO `t_hs_bustime` VALUES ('8', '19：40');
INSERT INTO `t_hs_bustime` VALUES ('8', '20：10');
INSERT INTO `t_hs_bustime` VALUES ('8', '20：50');
INSERT INTO `t_hs_bustime` VALUES ('9', '19：00');
INSERT INTO `t_hs_bustime` VALUES ('9', '19：40');
INSERT INTO `t_hs_bustime` VALUES ('9', '20：10');
INSERT INTO `t_hs_bustime` VALUES ('9', '20：50');
INSERT INTO `t_hs_bustime` VALUES ('10', '8:10');

-- ----------------------------
-- Table structure for t_hs_call_board
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_call_board`;
CREATE TABLE `t_hs_call_board` (
  `FID` int(11) NOT NULL AUTO_INCREMENT,
  `FContent` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `FDate` datetime DEFAULT NULL,
  `FUserID` varchar(40) CHARACTER SET utf8 NOT NULL,
  `FType` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_call_board
-- ----------------------------
INSERT INTO `t_hs_call_board` VALUES ('1', '年终奖金', '2015-08-25 12:27:23', '1', '重要');
INSERT INTO `t_hs_call_board` VALUES ('2', '没戏了', '2015-08-18 12:27:44', '1', '普通');
INSERT INTO `t_hs_call_board` VALUES ('3', 'hjhj', '2015-08-14 12:55:38', '0001', '重要');
INSERT INTO `t_hs_call_board` VALUES ('4', 'asdasd', '2015-08-14 13:13:24', '0001', '重要');
INSERT INTO `t_hs_call_board` VALUES ('5', 'zailaiyiad wd 打完我啊', '2015-08-14 13:13:37', '0001', '重要');
INSERT INTO `t_hs_call_board` VALUES ('6', '今天要护甲啦', '2015-08-14 13:26:37', '0001', '普通');
INSERT INTO `t_hs_call_board` VALUES ('7', '今天要护甲啦', '2015-08-14 13:27:42', '0001', '普通');
INSERT INTO `t_hs_call_board` VALUES ('8', '阿斯达爱的', '2015-08-14 13:27:54', '0001', '普通');
INSERT INTO `t_hs_call_board` VALUES ('9', 'asdad', '2015-08-14 16:06:20', '0001', '重要');
INSERT INTO `t_hs_call_board` VALUES ('10', '马上就要出发了\n', '2015-08-15 08:23:38', '0001', '普通');
INSERT INTO `t_hs_call_board` VALUES ('11', 'adsada', '2015-08-15 17:49:35', '', '重要');
INSERT INTO `t_hs_call_board` VALUES ('12', 'isasaoijdaoi joaijd owij wa ad', '2015-08-22 16:06:53', '0001', '重要');

-- ----------------------------
-- Table structure for t_hs_college_reserv
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_college_reserv`;
CREATE TABLE `t_hs_college_reserv` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FNumber` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FCompanyID` int(4) DEFAULT NULL,
  `FNum` int(4) DEFAULT NULL,
  `FRDate` datetime DEFAULT NULL,
  `FRTime` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FStopID` int(4) DEFAULT NULL,
  `FDate` datetime DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_college_reserv
-- ----------------------------
INSERT INTO `t_hs_college_reserv` VALUES ('12', '0001', '1', '100', '2015-08-20 00:00:00', '9:30', '5', '2015-08-18 20:19:33');
INSERT INTO `t_hs_college_reserv` VALUES ('13', '0001', '1', '12', '2015-08-22 00:00:00', '9:30', '4', '2015-08-18 20:20:16');
INSERT INTO `t_hs_college_reserv` VALUES ('14', '0001', '1', '122', '2015-08-19 00:00:00', '9:30', '28', '2015-08-18 20:21:33');
INSERT INTO `t_hs_college_reserv` VALUES ('15', '0001', '1', '122', '2015-08-26 00:00:00', '9:30', '28', '2015-08-18 20:24:49');
INSERT INTO `t_hs_college_reserv` VALUES ('16', '0001', '1', '123', '2017-08-29 00:00:00', '22:60', '24', '2015-08-22 14:24:15');

-- ----------------------------
-- Table structure for t_hs_company
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_company`;
CREATE TABLE `t_hs_company` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FName` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FAddress` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_company
-- ----------------------------
INSERT INTO `t_hs_company` VALUES ('1', 'hisense1', 'hisense1公司的地址');
INSERT INTO `t_hs_company` VALUES ('2', 'hisense2', 'hisense2公司的地址');

-- ----------------------------
-- Table structure for t_hs_employee
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_employee`;
CREATE TABLE `t_hs_employee` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FNumber` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FName` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FCompanyID` int(4) DEFAULT NULL,
  `FSectionID` int(4) DEFAULT NULL,
  `FPhone` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FPwd` varchar(80) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_employee
-- ----------------------------
INSERT INTO `t_hs_employee` VALUES ('1', '0001', 'lio', '1', '3', '12345656556', '123');
INSERT INTO `t_hs_employee` VALUES ('2', '0002', '刘明明', '2', '5', '21545634563', '123');
INSERT INTO `t_hs_employee` VALUES ('3', '0003', '刘明妮', '2', '6', '21545634563', '123');
INSERT INTO `t_hs_employee` VALUES ('4', '0004', '刘明昊', '2', '6', '21545634563', '123');
INSERT INTO `t_hs_employee` VALUES ('5', '0005', '刘明山', '2', '5', '21545634563', '123');
INSERT INTO `t_hs_employee` VALUES ('6', '0006', '刘明东', '2', '7', '21545634563', '123');
INSERT INTO `t_hs_employee` VALUES ('7', '0007', '刘明科', '2', '6', '21545634563', '123');
INSERT INTO `t_hs_employee` VALUES ('8', '0008', '刘明季', '2', '5', '21545634563', '');
INSERT INTO `t_hs_employee` VALUES ('9', '0009', '刘明达', '2', '7', '21545634563', '');
INSERT INTO `t_hs_employee` VALUES ('10', '0010', '刘明学', '2', '5', '21545634563', '');
INSERT INTO `t_hs_employee` VALUES ('11', '0011', '刘明信', '2', '7', '21545634563', '');
INSERT INTO `t_hs_employee` VALUES ('12', '0012', '刘明希', '2', '5', '21545634563', '');
INSERT INTO `t_hs_employee` VALUES ('13', '0013', '刘明媛', '2', '7', '21545634563', '');

-- ----------------------------
-- Table structure for t_hs_facility_repair
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_facility_repair`;
CREATE TABLE `t_hs_facility_repair` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FNumber` varchar(80) CHARACTER SET utf8 NOT NULL,
  `FSectionID` int(4) DEFAULT NULL,
  `FBuildingID` int(4) DEFAULT NULL,
  `FLocation` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FProblem` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FDate` datetime DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_facility_repair
-- ----------------------------
INSERT INTO `t_hs_facility_repair` VALUES ('4', '0001', '1', '1', '三楼', '空调出风口有问题', '2015-08-20 12:36:56');
INSERT INTO `t_hs_facility_repair` VALUES ('5', '0001', '1', '1', '三楼', '空调出风口有问题', '2015-08-20 14:27:29');

-- ----------------------------
-- Table structure for t_hs_favfood
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_favfood`;
CREATE TABLE `t_hs_favfood` (
  `FID` int(11) NOT NULL AUTO_INCREMENT,
  `dishName` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `intro` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `url` varchar(50) CHARACTER SET utf8 NOT NULL,
  `upname` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_favfood
-- ----------------------------
INSERT INTO `t_hs_favfood` VALUES ('17', '西红柿炒鸡蛋', '阿斯达', '3', '2015-08-19', '../../../../common/uploads/20150819153536359.jpg', '');
INSERT INTO `t_hs_favfood` VALUES ('18', '苦瓜', '苦', '4', '2015-08-19', '../../../../common/uploads/20150819153631927.jpg', '');
INSERT INTO `t_hs_favfood` VALUES ('19', '苦瓜', '苦', '5', '2015-08-19', '../../../../common/uploads/20150819153654860.jpg', '');
INSERT INTO `t_hs_favfood` VALUES ('20', '苦瓜', '苦', '2', '2015-08-19', '../../../../common/uploads/20150819153700519.jpg', '');
INSERT INTO `t_hs_favfood` VALUES ('21', 'dasdjakdjkaj', 'gdfgd', '0', '2015-08-22', '../../../../common/uploads/20150822160505451.jpg', '');
INSERT INTO `t_hs_favfood` VALUES ('22', 'dasdjakdjkaj', 'gdfgd', '0', '2015-08-22', '../../../../common/uploads/20150822160515103.jpg', '');
INSERT INTO `t_hs_favfood` VALUES ('23', 'mmm', 'iii', '0', '2015-09-07', '../../../../common/uploads/20150907074425608.jpg', '');

-- ----------------------------
-- Table structure for t_hs_idea
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_idea`;
CREATE TABLE `t_hs_idea` (
  `ideaType` varchar(255) CHARACTER SET utf8 NOT NULL,
  `ideaCon` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `ideaAdd` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_idea
-- ----------------------------
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'qweqwe', 'qweqwe');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'qweqwe', 'qweqwe');
INSERT INTO `t_hs_idea` VALUES ('XXXX', '??quanzhan', 'love 三妹');
INSERT INTO `t_hs_idea` VALUES ('XXXX', '????????????', '按时打算的撒');
INSERT INTO `t_hs_idea` VALUES ('XXXX', '阿斯达', '按时大大大');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'qweqwe', '123123');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'qwe', 'qweewq');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'ads', 'ads');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'dasdadas', 'dwqqe');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'aasdasdasdadsakl;lk;l;lk;l;kl;', 'asdadsas');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'xiugau', 'haode');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'ada ', 'asd a');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'das', 'asd');
INSERT INTO `t_hs_idea` VALUES ('XXXX', 'adsaasdadsas', 'asdadsadssdaas');

-- ----------------------------
-- Table structure for t_hs_meetingroom
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_meetingroom`;
CREATE TABLE `t_hs_meetingroom` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FName` varchar(80) CHARACTER SET utf8 NOT NULL,
  `FNum` int(4) DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_meetingroom
-- ----------------------------
INSERT INTO `t_hs_meetingroom` VALUES ('1', 'A3-101', '30');
INSERT INTO `t_hs_meetingroom` VALUES ('2', 'A3-102', '40');
INSERT INTO `t_hs_meetingroom` VALUES ('3', 'A3-103', '20');
INSERT INTO `t_hs_meetingroom` VALUES ('4', 'A3-104', '10');
INSERT INTO `t_hs_meetingroom` VALUES ('5', 'A3-105', '10');
INSERT INTO `t_hs_meetingroom` VALUES ('6', 'A3-106', '10');

-- ----------------------------
-- Table structure for t_hs_meetingroom_reserv
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_meetingroom_reserv`;
CREATE TABLE `t_hs_meetingroom_reserv` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FNumber` varchar(80) CHARACTER SET utf8 NOT NULL,
  `FSectionID` int(4) DEFAULT NULL,
  `FRoomID` int(4) NOT NULL,
  `FRDate` datetime NOT NULL,
  `FNum` int(4) NOT NULL,
  `FStartTime` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `FEndTime` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `FDate` datetime DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_meetingroom_reserv
-- ----------------------------
INSERT INTO `t_hs_meetingroom_reserv` VALUES ('76', '0001', '0', '5', '2015-08-22 00:00:00', '0', '12:00', '14:30', '2015-08-22 15:07:33');
INSERT INTO `t_hs_meetingroom_reserv` VALUES ('77', '0001', '0', '3', '2015-08-22 00:00:00', '0', '09:30', '11:00', '2015-08-22 15:08:13');
INSERT INTO `t_hs_meetingroom_reserv` VALUES ('78', '0001', '3', '4', '2015-08-22 00:00:00', '5', '08:00', '08:30', '2015-08-22 15:14:12');
INSERT INTO `t_hs_meetingroom_reserv` VALUES ('79', '0001', '4', '3', '2015-08-20 00:00:00', '0', '12:30', '14:00', '2015-08-22 15:24:34');
INSERT INTO `t_hs_meetingroom_reserv` VALUES ('80', '0001', '0', '3', '2015-08-22 00:00:00', '0', '13:00', '14:30', '2015-08-22 16:24:09');
INSERT INTO `t_hs_meetingroom_reserv` VALUES ('81', '0001', '2', '3', '2015-09-07 00:00:00', '0', '12:00', '13:30', '2015-09-07 07:42:03');

-- ----------------------------
-- Table structure for t_hs_overwork_reserv
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_overwork_reserv`;
CREATE TABLE `t_hs_overwork_reserv` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FNumber` varchar(80) DEFAULT NULL,
  `FRDate` datetime DEFAULT NULL,
  `FRTime` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FStopID` int(4) DEFAULT NULL,
  `FType` int(4) DEFAULT NULL,
  `FDate` datetime DEFAULT NULL,
  `FBookID` int(4) DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_overwork_reserv
-- ----------------------------
INSERT INTO `t_hs_overwork_reserv` VALUES ('9', '0002', '2015-08-10 00:00:00', '19：40', '8', '1', '2015-08-10 14:53:55', null);
INSERT INTO `t_hs_overwork_reserv` VALUES ('12', '0002', '2015-08-11 00:00:00', '19：40', '13', '1', '2015-08-11 15:17:46', null);
INSERT INTO `t_hs_overwork_reserv` VALUES ('13', '0001', '2015-08-18 00:00:00', '20：10', '2', '1', '2015-08-18 15:30:12', null);
INSERT INTO `t_hs_overwork_reserv` VALUES ('15', '0002', '2015-08-20 00:00:00', '19：00', '9', '1', '2015-08-18 18:13:45', null);
INSERT INTO `t_hs_overwork_reserv` VALUES ('16', '0002', '2015-08-21 00:00:00', '19：00', '1', '1', '2015-08-18 18:14:27', null);
INSERT INTO `t_hs_overwork_reserv` VALUES ('17', '0002', '2015-08-22 00:00:00', '', '1', '2', '2015-08-18 18:19:12', null);

-- ----------------------------
-- Table structure for t_hs_section
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_section`;
CREATE TABLE `t_hs_section` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FName` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FCompanyID` int(4) DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_section
-- ----------------------------
INSERT INTO `t_hs_section` VALUES ('1', '信息研发部1', '1');
INSERT INTO `t_hs_section` VALUES ('2', '信息研发部2', '1');
INSERT INTO `t_hs_section` VALUES ('3', '信息研发部3', '1');
INSERT INTO `t_hs_section` VALUES ('4', '信息研发部4', '1');
INSERT INTO `t_hs_section` VALUES ('5', '信息研发部1', '2');
INSERT INTO `t_hs_section` VALUES ('6', '信息研发部2', '2');
INSERT INTO `t_hs_section` VALUES ('7', '信息研发部3', '2');

-- ----------------------------
-- Table structure for t_hs_stop
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_stop`;
CREATE TABLE `t_hs_stop` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FName` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FRemark` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FTime` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_stop
-- ----------------------------
INSERT INTO `t_hs_stop` VALUES ('1', '百通馨苑一区', '金水路与巨峰路路口附近，金水路上“百通馨苑一区”公交车站，途径公交车：9、123、130、363、387、408', '8:40');
INSERT INTO `t_hs_stop` VALUES ('2', '五十八中', '黑龙江路与九水路交界', null);
INSERT INTO `t_hs_stop` VALUES ('3', '李沧区政府', null, null);
INSERT INTO `t_hs_stop` VALUES ('4', '河西', null, null);
INSERT INTO `t_hs_stop` VALUES ('5', '保儿', '原双山', null);
INSERT INTO `t_hs_stop` VALUES ('6', '福州路东小区', null, null);
INSERT INTO `t_hs_stop` VALUES ('7', '洪山坡小区', null, null);
INSERT INTO `t_hs_stop` VALUES ('8', '延吉路东站', null, null);
INSERT INTO `t_hs_stop` VALUES ('9', '广电大厦', null, null);
INSERT INTO `t_hs_stop` VALUES ('10', '二十五中', null, null);
INSERT INTO `t_hs_stop` VALUES ('11', '江西路研发中心', null, '8:10');
INSERT INTO `t_hs_stop` VALUES ('12', '大村庄', '沧口长途站', null);
INSERT INTO `t_hs_stop` VALUES ('13', '延寿宫', null, null);
INSERT INTO `t_hs_stop` VALUES ('14', '小水清沟', null, null);
INSERT INTO `t_hs_stop` VALUES ('15', '大山', null, null);
INSERT INTO `t_hs_stop` VALUES ('16', '清江路', null, null);
INSERT INTO `t_hs_stop` VALUES ('17', '山东路北站 ', null, null);
INSERT INTO `t_hs_stop` VALUES ('18', '四方长途站', null, null);
INSERT INTO `t_hs_stop` VALUES ('19', '利津路长途站', null, null);
INSERT INTO `t_hs_stop` VALUES ('20', '李沧万达', '下王埠', null);
INSERT INTO `t_hs_stop` VALUES ('21', '辽阳路东站', null, null);
INSERT INTO `t_hs_stop` VALUES ('22', '劲松三路', null, null);
INSERT INTO `t_hs_stop` VALUES ('23', '新业广场', null, null);
INSERT INTO `t_hs_stop` VALUES ('24', '山东路南站 ', null, null);
INSERT INTO `t_hs_stop` VALUES ('25', '劲松三路601总站', null, null);
INSERT INTO `t_hs_stop` VALUES ('26', '田家村公寓', '福州路与延吉路路口附近，福州路上“延吉路东”公交车站，途径公交车：23、208、216、228、320、363、369、409、503、601', '8:20');
INSERT INTO `t_hs_stop` VALUES ('27', '沧口汽车站', null, null);
INSERT INTO `t_hs_stop` VALUES ('28', '双山', '黑龙江路上，“双山”公交车站，途径公交车：3、23、306、318、363、368、328、405、465、403、603、605', '8:25');
INSERT INTO `t_hs_stop` VALUES ('29', '东李村', '黑龙江路与九水路口附近，黑龙江路上“东李立交桥”公交车站，途径公交车：3、230、312、407、503', '8:35');

-- ----------------------------
-- Table structure for t_hs_temporary_reserv
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_temporary_reserv`;
CREATE TABLE `t_hs_temporary_reserv` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FNumber` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FCompanyID` int(4) DEFAULT NULL,
  `FNum` int(4) DEFAULT NULL,
  `FRDate` datetime DEFAULT NULL,
  `FRTime` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FStartStop` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FEndStop` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FType` int(4) DEFAULT NULL,
  `FDate` datetime DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_temporary_reserv
-- ----------------------------
INSERT INTO `t_hs_temporary_reserv` VALUES ('1', '0001', '1', '1221', '2015-08-09 00:00:00', '9:30', '12', '321', '1', '2015-08-12 17:44:19');
INSERT INTO `t_hs_temporary_reserv` VALUES ('2', '0001', '1', '123', '2015-01-20 00:00:00', '9:30', 'aaa', 'bbb', '1', '2015-08-18 09:34:53');
INSERT INTO `t_hs_temporary_reserv` VALUES ('11', '0001', '1', '0', '2015-08-19 00:00:00', '9:30', 'eee', 'fff', '0', '2015-08-18 20:02:32');
INSERT INTO `t_hs_temporary_reserv` VALUES ('12', '0001', '1', '1231', '2015-08-22 00:00:00', '9:30', 'ewq', 'qwe', '1', '2015-08-22 16:41:23');
INSERT INTO `t_hs_temporary_reserv` VALUES ('13', '0001', '1', '33', '2015-04-04 00:00:00', '12:50', '44', '33', '0', '2015-08-22 16:09:56');
INSERT INTO `t_hs_temporary_reserv` VALUES ('14', '0001', '1', '1231', '2015-08-23 00:00:00', '9:30', 'ewq', 'qwe', '1', '2015-08-22 16:41:16');
INSERT INTO `t_hs_temporary_reserv` VALUES ('15', '0001', '1', '1231', '2015-08-24 00:00:00', '9:30', 'ewq', 'qwe', '1', '2015-08-22 16:41:29');
INSERT INTO `t_hs_temporary_reserv` VALUES ('16', '0001', '1', '1231', '2015-08-25 00:00:00', '9:30', 'ewq', 'qwe', '0', '2015-08-22 16:41:35');

-- ----------------------------
-- Table structure for t_hs_wechat
-- ----------------------------
DROP TABLE IF EXISTS `t_hs_wechat`;
CREATE TABLE `t_hs_wechat` (
  `FID` int(4) NOT NULL AUTO_INCREMENT,
  `FNumber` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FWechatID` varchar(80) CHARACTER SET utf8 DEFAULT NULL,
  `FType` int(4) DEFAULT NULL,
  PRIMARY KEY (`FID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of t_hs_wechat
-- ----------------------------
INSERT INTO `t_hs_wechat` VALUES ('1', '0001', '0001', '0');
INSERT INTO `t_hs_wechat` VALUES ('2', '0002', '0002', '1');
