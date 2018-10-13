-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 16, 2018 at 12:12 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE IF NOT EXISTS `playlists` (
`id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(1, 'Background songs', 'https://wallpaper-house.com/data/out/10/wallpaper2you_442049.jpg', '[{"name" : "BloodCity","url" : "https://archive.org/download/FREE_background_music_dhalius/BloodCity.mp3"},{"name" : "Director","url" : "https://archive.org/download/FREE_background_music_dhalius/Director.mp3"}, {"name" : "FaceBangSonic", "url" : "https://archive.org/download/FREE_background_music_dhalius/FaceBangSonic.mp3"},{"name" : "FormulaFantasy","url" :" https://archive.org/download/FREE_background_music_dhalius/FormulaFantasy.mp3"},{"name" : "Guilt","url" : "https://archive.org/download/FREE_background_music_dhalius/Guilt.mp3"}]'),
(2, 'Electronic songs', 'http://static.tumblr.com/f1783856c17236f9dc84ce63e1a490b7/tn5ucoc/4tjn1w88r/tumblr_static_11-dj-music-wallpaper.jpeg', '[{"name":"Backsound","url":"https:\\/\\/archive.org\\/download\\/electronic_music_201403\\/backsound.mp3"},{"name":"Fire","url":"https:\\/\\/ia800607.us.archive.org\\/33\\/items\\/electronic_music_201403\\/Fire%20Range.mp3"},{"name":"Sun","url":"https:\\/\\/ia800607.us.archive.org\\/33\\/items\\/electronic_music_201403\\/The%20Sun.mp3"},{"name":"Soul","url":"https:\\/\\/ia600607.us.archive.org\\/33\\/items\\/electronic_music_201403\\/Vintage%20Soul.mp3"},{"name":"Gate","url":"https:\\/\\/archive.org\\/download\\/electronic_music_201403\\/Golden%20Gate.mp3 "}]'),
(4, 'slow rock legend', 'https://sunbeamwhdh.files.wordpress.com/2017/05/170525_aerosmith.jpg', '[{"name":"Crazy","url":"https:\\/\\/ia801200.us.archive.org\\/20\\/items\\/SlowRockLegend\\/02.%20Crazy%20-%20Aerosmith.mp3"},{"name":"Roxanne","url":"https:\\/\\/ia601200.us.archive.org\\/20\\/items\\/SlowRockLegend\\/02.%20Roxanne%20-%20Police.mp3"},{"name":"November Rain","url":"https:\\/\\/ia801200.us.archive.org\\/20\\/items\\/SlowRockLegend\\/04%20GUNS%20N%20ROSES%20-%20November%20Rain.mp3"},{"name":"Behemian Rhapsody","url":"https:\\/\\/ia801200.us.archive.org\\/20\\/items\\/SlowRockLegend\\/13%20QUEEN%20-%20Behemian%20Rhapsody.mp3"}]'),
(9, 'Metalica', 'https://i.skyrock.net/4944/71434944/pics/2958234435_1_3_iZ7c07Z6.jpg', '[{"name":"Nothing Else Matter","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/03%20METALLICA%20-%20Nothing%20Else%20Matter.mp3"}]'),
(11, 'Rock classic', 'https://firstpick.com.au/wp-content/uploads/2015/01/3311-300x300.jpg', '[{"name":"Stairway to heaven","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/02.%20%20Stairway%20To%20Heaven%20-%20Led%20Zeppelin.mp3"},{"name":"Hotel california","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/01%20EAGLES%20-%20Hotel%20California.mp3"},{"name":"We are the champion","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/09.%20We%20Are%20The%20Champion%20-%20Queen.mp3"},{"name":"Losing my religion","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/10.%20Losing%20My%20Religion%20-%20REM.mp3"},{"name":"I dont want to miss a thing","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/12%20AEROSMITH%20-%20I%20Don%27t%20Wanna%20Miss.mp3"},{"name":"I want to break free","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/13.%20I%20Want%20To%20Break%20Free%20-%20Queen.mp3"},{"name":"Dont cry","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/04.%20Don%27t%20Cry%20-%20Gun%20N%20Roses.mp3"},{"name":"Creep","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/04.%20Creep%20-%20Radiohead.mp3"}]'),
(49, 'Queen', 'https://i.ytimg.com/vi/_Uu12zY01ts/maxresdefault.jpg', '[{"name":"We are the champion","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/09.%20We%20Are%20The%20Champion%20-%20Queen.mp3"},{"name":"Behemian Rhapsody","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/13%20QUEEN%20-%20Behemian%20Rhapsody.mp3"},{"name":"Love of my life","url":"https:\\/\\/archive.org\\/download\\/SlowRockLegend\\/01.%20Love%20Of%20A%20Life%20Time%20-%20Fire%20House.mp3"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
 ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=50;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
