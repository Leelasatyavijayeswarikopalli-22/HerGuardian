package com.herguardian.Backend.service;

import com.herguardian.Backend.entity.Report;
import com.herguardian.Backend.entity.User;
import com.herguardian.Backend.repository.ReportRepository;
import com.herguardian.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    // Save a report from a normal user
    public Report save(
            Report report,
            Authentication authentication
    ) {
        User user = getAuthenticatedUser(authentication);

        if ("AUTHORITY".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Authorities cannot submit community reports"
            );
        }

        // Do not trust these fields from the frontend
        report.setId(null);
        report.setReportedBy(user.getEmail());
        report.setStatus("ACTIVE");
        report.setReportCount(1);
        report.setVerified(false);
        report.setAuthorityName(null);
        report.setAdminRemark(null);
        report.setResolvedAt(null);
        report.setReportedAt(null);

        return reportRepository.save(report);
    }

    // Authority only
    public List<Report> getAllReports(
            Authentication authentication
    ) {
        requireAuthority(authentication);
        return reportRepository.findAll();
    }

    // Authority only
    public List<Report> getActiveReports(
            Authentication authentication
    ) {
        requireAuthority(authentication);
        return reportRepository.findByStatusNot("RECTIFIED");
    }

    // Authority only
    public List<Report> getRectifiedReports(
            Authentication authentication
    ) {
        requireAuthority(authentication);
        return reportRepository.findByStatus("RECTIFIED");
    }

    // Logged-in user only
    public List<Report> getUserActiveReports(
            Authentication authentication
    ) {
        User user = getAuthenticatedUser(authentication);

        return reportRepository.findByReportedByAndStatusNot(
                user.getEmail(),
                "RECTIFIED"
        );
    }

    // Logged-in user only
    public List<Report> getUserRectifiedReports(
            Authentication authentication
    ) {
        User user = getAuthenticatedUser(authentication);

        return reportRepository.findByReportedByAndStatus(
                user.getEmail(),
                "RECTIFIED"
        );
    }

    // Authority updates report status
    public Report updateStatus(
            Long id,
            String status,
            String remark,
            Authentication authentication
    ) {
        User authority = requireAuthority(authentication);

        if (status == null || status.trim().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Status is required"
            );
        }

        String normalizedStatus =
                status.trim().toUpperCase(Locale.ROOT);

        Report report = reportRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Report not found"
                        )
                );

        report.setStatus(normalizedStatus);
        report.setAdminRemark(remark);

        // Use the real logged-in authority name
        report.setAuthorityName(authority.getFullName());

        if ("RECTIFIED".equals(normalizedStatus)) {
            report.setVerified(true);
            report.setResolvedAt(LocalDateTime.now());
        } else {
            report.setVerified(false);
            report.setResolvedAt(null);
        }

        return reportRepository.save(report);
    }

    private User getAuthenticatedUser(
            Authentication authentication
    ) {
        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Authentication required"
            );
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "User not found"
                        )
                );
    }

    private User requireAuthority(
            Authentication authentication
    ) {
        User user = getAuthenticatedUser(authentication);

        if (!"AUTHORITY".equalsIgnoreCase(user.getRole())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Authority access required"
            );
        }

        return user;
    }
}