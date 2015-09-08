package biz.neustar.pc.ui.utils;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PCloudErrorUtil {
    private Logger LOGGER = LoggerFactory.getLogger(PCloudErrorUtil.class);
    private static Properties props;

    static {
        props = new Properties();
        try {
            PCloudErrorUtil util = new PCloudErrorUtil();
            props = util.getPropertiesFromClasspath("errors.properties");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // private constructor
    private PCloudErrorUtil() {
    }

    public static String getProperty(String key) {
        return props.getProperty(key).trim();
    }

    public static Set getkeys() {
        return props.keySet();
    }

    /**
     * Loads properties file from classpath
     * 
     * @param fileName
     * @return
     * @throws IOException
     */
    private Properties getPropertiesFromClasspath(String fileName) throws IOException {
        Properties props = new Properties();
        InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream(fileName);

        if (inputStream == null) {
            LOGGER.error("Property file '" + fileName + "' not found in the classpath");
            throw new FileNotFoundException("Property file '" + fileName + "' not found in the classpath");
        }
        props.load(inputStream);
        return props;
    }
}
