package biz.neustar.pc.ui.exception;

import java.util.List;

import biz.neustar.pcloud.rest.dto.PCloudError;

public class PCloudErrorsUIException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<PCloudError> errors;
	private int statusCode;
	public List<PCloudError> getErrors() {
		return errors;
	}
	public void setErrors(List<PCloudError> errors) {
		this.errors = errors;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public PCloudErrorsUIException(List<PCloudError> errors, int statusCode) {
		super();
		this.errors = errors;
		this.statusCode = statusCode;
	}
	@Override
	public String toString() {
		return "PCloudErrorsUIException [errors=" + errors + ", statusCode="
				+ statusCode + "]";
	}
	
	
	
}
