package com.ian.escuela;

import org.junit.Test;
import static org.junit.Assert.*;

public class StoryVolumePolicyTest {
    @Test public void videosStayAtSixtyWithPhysicalAndExternalChanges() {
        for (int maximum : new int[] { 7, 10, 15, 150 }) {
            Output output = new Output(maximum, maximum);
            StoryVolumePolicy policy = new StoryVolumePolicy(output);
            policy.begin(60);
            assertTrue(output.level * 100 <= maximum * 60);
            for (int i = 0; i < maximum + 5; i++) policy.adjust(1);
            assertTrue(output.level * 100 <= maximum * 60);
            output.level = maximum;
            policy.observe();
            assertTrue(output.level * 100 <= maximum * 60);
            policy.end();
        }
    }

    @Test public void videoPauseRestoresAndNarrationKeepsItsOwnLimit() {
        Output output = new Output(15, 15);
        StoryVolumePolicy policy = new StoryVolumePolicy(output);
        policy.begin(60); assertEquals(9, output.level);
        policy.end(); assertEquals(15, output.level);
        policy.begin(); assertEquals(10, output.level);
        policy.end(); assertEquals(15, output.level);
    }

    private static class Output implements StoryVolumePolicy.Output {
        int level, max;
        Output(int level, int max) { this.level = level; this.max = max; }
        public int current() { return level; }
        public int maximum() { return max; }
        public void set(int value) { level = value; }
    }

    @Test public void capsWithoutRoundingAboveSeventyAndRestores() {
        Output output = new Output(15, 15);
        StoryVolumePolicy policy = new StoryVolumePolicy(output);
        policy.begin();
        assertEquals(10, output.level);
        assertTrue(output.level * 100 <= output.max * 70);
        policy.observe();
        policy.end();
        assertEquals(15, output.level);
        assertFalse(policy.active());
    }

    @Test public void lowerVolumeIsNeverRaisedAndUserChoiceSurvives() {
        Output output = new Output(3, 10);
        StoryVolumePolicy policy = new StoryVolumePolicy(output);
        policy.begin();
        assertEquals(3, output.level);
        policy.adjust(-1);
        policy.end();
        assertEquals(2, output.level);
    }

    @Test public void buttonsWorkInBothDirectionsWithinTheCeiling() {
        Output output = new Output(10, 10);
        StoryVolumePolicy policy = new StoryVolumePolicy(output);
        policy.begin();
        for (int i = 0; i < 20; i++) policy.adjust(-1);
        assertEquals(0, output.level);
        for (int i = 0; i < 20; i++) policy.adjust(1);
        assertEquals(7, output.level);
        policy.end();
        assertEquals(7, output.level);
    }

    @Test public void externalChangesAreCappedAndRespectedAfterwards() {
        Output output = new Output(10, 10);
        StoryVolumePolicy policy = new StoryVolumePolicy(output);
        policy.begin();
        output.level = 9;
        policy.observe();
        assertEquals(7, output.level);
        output.level = 4;
        policy.observe();
        policy.end();
        assertEquals(4, output.level);
    }

    @Test public void duplicateBeginDoesNotLoseTheOriginalVolume() {
        Output output = new Output(10, 10);
        StoryVolumePolicy policy = new StoryVolumePolicy(output);
        policy.begin(); policy.begin(); policy.end(); policy.end();
        assertEquals(10, output.level);
    }

    @Test public void mutingIsAValidChoice() {
        Output output = new Output(0, 10);
        StoryVolumePolicy policy = new StoryVolumePolicy(output);
        policy.begin();
        assertEquals(0, output.level);
        policy.toggleMute(); assertEquals(7, output.level);
        policy.toggleMute(); policy.end(); assertEquals(0, output.level);
    }
}
